import React from 'react'
import CourseList from '../components/CourseList'

const Courses = () => {
  return (
    <div className='flex flex-col px-10 py-14  w-4/6 bg-slate-100'>
        <div className="flex justify-between ml-2">
          <div className="text-2xl font-bold">Courses</div>
        </div><br/>
        <CourseList/>
    </div>
  )
}

export default Courses