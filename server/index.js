const express = require("express");
const app = express();
const port = 3000;
const Router = require("./routes/routes");
const cookieParser  =  require('cookie-parser')

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use(Router);

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
