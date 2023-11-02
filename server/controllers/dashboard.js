const usersDB = {
    users: require("../db/student.json"),
    setUsers: function (data) {
      this.users = data;
    },
}



const getDashboardData =async (req, res)=>{
    const {rollNumber} = req.params
    const currentUser = usersDB.users.find(user=>user.rollNumber == rollNumber)
    console.log(currentUser, rollNumber)
    res.json({success:true, data:currentUser})
}

module.exports = {getDashboardData}