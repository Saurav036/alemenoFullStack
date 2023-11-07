import React, {useEffect, useState} from "react";
import {useNavigate, useLocation} from 'react-router-dom'
import { Avatar } from "flowbite-react";
import { LogOut } from "react-feather";

const ProfileBar = () => {
    const navigate = useNavigate()

    const onLogOut = ()=>{
        // to do logout
        navigate('/login', {replace:true})
    }

    const location = useLocation()
    const [visible, setVisible] = useState(false)
    useEffect(() => {
      if(location?.pathname!=='/login'){
        setVisible(true)
      }else{setVisible(false)}
    
      
    }, [location])
    

  return visible &&
    <div className="bg-white w-1/6 flex flex-col  items-center gap-4">
      <div className="cursor-pointer flex gap-2 border mt-6 rounded p-2" onClick={()=>{onLogOut()
        
      }}>
        logout
        <LogOut />
      </div>
      <div className="mt-10">
        <Avatar
          size="xl"
          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKstrwm-tkSpnFp3v8DLGmvO35Jxv9YxmzQQ&usqp=CAU"
          rounded
          status="online"
        />
      </div>
      <div className="text-slate-950 text-md font-medium">Bhupendra jogi</div>
      <div className="text-slate-300 ">bupendra_jogi@usa.com</div>
    </div>
  
};

export default ProfileBar;
