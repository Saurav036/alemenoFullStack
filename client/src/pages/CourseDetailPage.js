import React from "react";
import list from "./list.json";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Avatar , Accordion} from "flowbite-react";
import {ArrowLeft} from 'react-feather'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const CourseDetailPage = () => {
  const navigate =useNavigate()
  const params = useParams();
  const [c, setC] = useState(null);
  const courses = useSelector(state=>state?.course?.courses)

  const findCourse = (id) => {
    const res = courses.length>0 && courses.find((c) => c.id == id);
    return res;
  };

  useEffect(() => {
    if (params) {
      setC(findCourse(params?.id));
    }
  }, []);

  return (
    <div className="flex flex-col px-10 py-14  w-4/6 bg-slate-100">
      {c && (
        <div>
          <button className='rounded-md p-2 bg-white text-slate-800 mb-4 ' onClick={()=>navigate('/courses')}><ArrowLeft/></button>
          <div className="flex justify-between ml-2">
            <div className="text-2xl font-bold mb-6">{c.name}</div>
          </div>

          <img className='mb-4'src={c.thumbnail} />

          <div className='text-slate-500 text-lg'>
            {c.description}
          </div>

          <div className="flex gap-3 text-xl font-medium my-4 border-b-2 border-slate-500 pb-4">
          <Avatar img="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202310/bhupendra-jogi-272420798-1x1.jpg?VersionId=JJZHo5tfQ5c7lkRH1v7nUss.4e2.YjvN" status="online" /> 
          {c.instructor}
          </div>
          <div className='my-2'>
            {`scheduled :  ${c.schedule}`}
          </div>
          <div className='my-2'>
            {`duration :  ${c.duration}`}
            
          </div>
          <div className='my-2 text-2xl font-bold text-center p-3 rounded-lg bg-yellow-200'>
            {`${c.enrollmentStatus}`}
            
          </div>
          <div className='my-2 pt-4 font-medium border-slate-500 border-t-2 mt-4'>
            {`Things you must know :  ${c.prerequisites}`}
            
          </div>
          <div className='text-2xl font-medium '>
            Syllabus
            <div>
                {c.syllabus.map(s=>{
                    return <div className='text-md font-normal my-4 bg-white hover:bg-fuchsia-100'><Accordion collapseAll>
                    <Accordion.Panel>
                      <Accordion.Title>{s.topic}</Accordion.Title>
                      <Accordion.Content>
                        {s.content}
                      </Accordion.Content>
                    </Accordion.Panel>
                    
                  </Accordion>
                  </div>
                })}
            </div>
          </div>
          
            
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
