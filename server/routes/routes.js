const express = require('express')
const router = express.Router()
const {handleLogin, handleNewUser, handleRefreshToken, handleLogout}  = require('../controllers/auth')
const {getCourses, getCourseById, addCourse} = require('../controllers/courses')
const {getDashboardData}= require('../controllers/dashboard')
const verifyJwt = require('../middleware/verifyJwt')

router.get('/ankit', (req, res)=>{
    res.json({message:'hello ankit'})
})
//auth
router.post('/login', handleLogin)
router.get('/logout', handleLogout)
router.post('/register', handleNewUser)
router.get('/refresh', handleRefreshToken)

//courses
router.get('/courses', verifyJwt, getCourses)
router.get('/course',verifyJwt, getCourseById)
router.get('/addCourse', verifyJwt, addCourse)

//student
router.get('/dashboard/:rollNumber', verifyJwt, getDashboardData)


module.exports = router;