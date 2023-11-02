const jwt = require("jsonwebtoken");
const fsPromises = require("fs").promises;
const path = require("path");

const usersDB = {
  users: require("../db/student.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  console.log(user, pwd);
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const foundUser = usersDB.users.find((person) => person.username === user);
  if (!foundUser) return res.sendStatus(401); //Unauthorized

  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // create JWTs
    const accessToken = jwt.sign(
      { username: foundUser.username },
      //   process.env.ACCESS_TOKEN_SECRET,
      "mysecret",
      { expiresIn: "20s" }
    );

    const refreshToken = jwt.sign(
     {username:foundUser.username},
      //   process.env.REFRESH_TOKEN_SECRET,
      "myrefresh",
      { expiresIn: "40s" }
    );
    // Saving refreshToken with current user
    const otherUsers = usersDB.users.filter(
      (person) => person.username !== foundUser.username
    );
    const currentUser = { ...foundUser, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "db", "student.json"),
      JSON.stringify(usersDB.users)
    );
    console.log(
      `accesstoken : ${accessToken}\n\n Refresh token : ${refreshToken}`
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: false,
      maxAge: 30000,
    });
    res.json({ success: true, token: accessToken });
  } else {
    res.sendStatus(401);
  }
};

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  // check for duplicate usernames in the db
  const duplicate = usersDB.users.find((person) => person.username === user);
  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //store the new user
    const newUser = { username: user, password: hashedPwd };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "db", "student.json"),
      JSON.stringify(usersDB.users)
    );
    console.log(usersDB.users);
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
//   console.log("cookies", cookies);
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  console.log("refreshing token", refreshToken);
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  console.log(foundUser)
  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, 'myrefresh', (err, decoded) => {
    if (err || foundUser.username !== decoded.username){
console.log(err, decoded)
        return res.sendStatus(403);
    }
    const accessToken = jwt.sign(
      { username: decoded.username },
      'mysecret',
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
};
module.exports = {
  handleLogin,
  handleLogout,
  handleNewUser,
  handleRefreshToken,
};
