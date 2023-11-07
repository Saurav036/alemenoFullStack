import React, {useState, useEffect} from "react";
import { login, setUserInfo, setAuthInfo } from "../redux/auth/authAction";
import {Link , useNavigate,} from 'react-router-dom'
import api from '../api/axios'
import { useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth";



const Login = () => {
  const axiosPrivate = useAuth()
  const [user, setUser] = useState("")
  const [pwd, setpwd] = useState("")
  const navigate = useNavigate()
  const dispatch= useDispatch()

  

  const onSubmit = async(e)=>{
    e.preventDefault()
    let data = {user:'bhupendra jogi', pwd:'1234'}
    let response =  await fetch('http://localhost:3000/login',{
    method:'POST',  
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  withCredentials:true},{withCredentials:true})
    let res = await response.json()
    console.log(res)
    // if(!res) throw `login failed`
    // let userInfo = decodeJwt(res.data.accessToken)
    // console.log('user info is here ', userInfo)
    if(res?.token){
// console.log('trying to dispatch ', res?.data)
      dispatch(setAuthInfo(res))
      navigate('/dashboard')
    
    }
    // alert(JSON.stringify(res))
  }
  return (
    <div className="flex justify-center items-center p-8 pt-20">
      <div className="flex justify-center shadow-md rounded-2xl border h-[70vh] w-[70vw]">
        <div
          className="h-full w-full bg-clip-border"
          style={{
            backgroundImage:
              "url('https://media.istockphoto.com/id/1368954963/photo/cyber-security-in-two-step-verification-login-user-identification-information-security-and.jpg?s=1024x1024&w=is&k=20&c=0tgn8IeQbFoZBv3fDALx7m34BsqJLTKPvwpo49BA0tI=')",
          objectFit:"fill",
          backgroundSize:'cover'
            }}
        ></div>
        <div className="h-full w-full">
          <form onSubmit={onSubmit}>
            
          
            
            <div className="flex flex-col gap-8 justify-center pt-10 px-10">
                
                <input onChange={(e)=>setUser(e.target.value)} value={user} labelText='Email/phone' placeholder="Enter email or phone number"/>
                <input onChange={(e)=>setpwd(e.target.value)} value={pwd} labelText='Password' placeholder="Enter password"/>
              <button
                type="submit"
                className="pt-10 bg-gray-800 transition duration-150 ease-in-out hover:opacity-80 font-semibold rounded text-white px-11 py-6 text-xs focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-indigo-600"
              >
                Login
              </button>
            </div>
            <div className="pt-6 flex space-x-2 justify-center">
              <p>Not a user?</p>
              <Link to="/">
                <span style={{ color: "rgb(63 131 248" }}>Sign up</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
