import { privateApi } from "../../api/axios"
import { SET_COURSES } from "./type"
import useAuth from "../../hooks/useAuth"


const setCourses = (data)=>{
    return {type:SET_COURSES,data}
}


export const getCourses =()=>{
    return  (dispatch)=>{
        return  privateApi.get('/courses').then(res=>{
            console.log(res)
            dispatch(setCourses(res?.data?.courses))
            return res
        }).catch(err=>console.log(err))
    }
}