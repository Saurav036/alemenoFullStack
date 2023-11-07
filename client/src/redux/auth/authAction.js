import {LOGIN, SETAUTH, SETAUTHREFRESH, SETUSER} from './type'
import axios from 'axios'
import { privateApi } from '../../api/axios'





//actions
export const setUserInfo=(data)=>{
    return {
        type:SETUSER,
        data
    }
}

export const setAuthInfo = (data)=>{
    console.log('data in the action payload', data )
    return {
        type:SETAUTH,
        data
    }
}

export const setRefreshedAuthInfo =(data)=>{
    return {
        type:SETAUTHREFRESH,
        data
    }
}


//dispatch
export const login =(data)=>{
    return dispatch=>{

        return axios.post('http://localhost:3000/login', data).then(res=>{
            console.log(res)
            dispatch(setUserInfo(res))
            return res
        })
    }
}

export function getRefreshToken() {
    return (dispatch) => {
        return privateApi.get('/refresh')
        .then((res) => {
            dispatch(setRefreshedAuthInfo(res?.accessToken))
          return res;
        });
    };
  }