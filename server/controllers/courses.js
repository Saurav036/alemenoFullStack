

const coursesDB = {
    courses: require('../db/courseList.json'),
    setCourses : function (data){this.course = data}
}
const getCourses =async (req, res)=>{

res.json({success:true, courses:coursesDB.courses})
}


const getCourseById = async (req, res)=>{
    console.log('coming here')
    console.log(req.query)
    const {id} = req.query
    const course = coursesDB.courses.find(c=>c?.id ===id)
    if(!course)return res.sendStatus(404)
    res.json({success:true, course:course})

    
}
const addCourse = async (req, res)=>{
    const courseData = req.body
    if(!courseData)return res.sendStatus(404)
    const data = [...coursesDB.courses, courseData]
    coursesDB.setUsers(data);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "db", "courseList.json"),
      JSON.stringify(usersDB.users)
    );
    if(!course)return res.sendStatus(404)
    res.json({success:true, course:course})

    
}

const createEnrollment = async (req, res)=>{
    const {rollNumber} = req.params
}

module.exports = {getCourses, getCourseById,addCourse}