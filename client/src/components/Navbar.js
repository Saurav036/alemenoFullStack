import { Sidebar } from "flowbite-react";
import { NavLink } from "react-router-dom";
import {useEffect, useState} from 'react'
import { useLocation } from "react-router-dom";
import { Command, List, Settings, Users } from "react-feather";

const Navbar = () => {
    const location = useLocation()
    const [visible, setVisible] = useState(false)
    useEffect(() => {
      if(location?.pathname==='/login'){
        setVisible(false)
      }else{setVisible(true)}
    
      
    }, [location])
    

  return visible &&
    // <Sidebar  aria-label="Default sidebar example">
<div className='w-1/6 max-w-1/6 p-2 bg-white sticky'>
    <div className='text-violet-700 text-3xl font-bold font-sans p-4 mb-5'>Ankit Proj</div>
      <div >
        <div>
          <NavLink
            to="dashboard"
            className={({isActive}) => {
              return `flex gap-3 p-4 mb-2 text-slate-600 ${isActive?'border-l-4  border-fuchsia-700 bg-fuchsia-100 rounded-lg':''}`;
            }}
          >
            <Command /> Dashboard
          </NavLink>

          <NavLink
            to="courses"
            className={({isActive}) => {
                return `flex gap-3 p-4 mb-2 text-slate-600 ${isActive?'border-l-4  border-fuchsia-700 bg-fuchsia-100 rounded-lg':''}`;
              }}
          >
            <List /> Courses
          </NavLink>
          <NavLink
            to="students"
            className={({isActive}) => {
                return `flex gap-3 p-4 mb-2 text-slate-600 ${isActive?'border-l-4  border-fuchsia-700 bg-fuchsia-100 rounded-lg':''}`;
              }}
          >
            <Users /> Students
          </NavLink>
          <NavLink
            to="settings"
            className={({isActive}) => {
                return `flex gap-3 p-4 mb-2 text-slate-600 ${isActive?'border-l-4  border-fuchsia-700 bg-fuchsia-100 rounded-lg':''}`;
              }}
          >
            <Settings /> Settings
          </NavLink>
        </div>
      </div>
      </div>

};

export default Navbar;
