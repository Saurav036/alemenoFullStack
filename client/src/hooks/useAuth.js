import api, { privateApi } from "../api/axios";
import axios from "axios";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { setRefreshedAuthInfo } from "../redux/auth/authAction";


const useAuth = () => {
  let auth = useSelector((state) => state.auth.auth);
  
  
  useEffect(() => {
      console.log('auth selectore data ', auth)

    const requestInterceptor = privateApi.interceptors.request.use(
      (config) => {
          console.log('req inter', config)
        if (!config?.headers?.['Authorization']) {
          config.headers[`Authorization`] = `Bearer ${auth?.token}`;
          config.headers[`Content-Type`] = `application/json`;
        }
        return config;
    },
    (err) => Promise.reject(err)
    );
    
    const responseInterceptor = privateApi.interceptors.response.use(
        (res) => res,
        async (err,config) => {
            const prevReq = err && err.config;
            console.log(" error res inter",prevReq)
            if (!prevReq?.sent) {
                prevReq.sent = true;
                console.log('requesting refresh token ')
                const newAccessToken = await api.get("http://localhost:3000/refresh",{withCredentials:true}).then(res=>res.json()).then(res=>res).catch(err=>console.log('.then > err', err));
                console.log(newAccessToken)
                //   const refreshToken = setRefreshedAuthInfo();
                const refreshToken = 'ankit'
                //   console.log(
                    //     `newAccesstoken:  ${newAccessToken} \n refreshed redux token: ${refreshToken}`
                    //   );
                    
                    prevReq.headers['Authorizaton'] = `Bearer ${newAccessToken}`;
                    prevReq.headers[`Content-Type`] = `application/json`;
                    if(newAccessToken ){console.log('coming to this block ');return privateApi(prevReq);}
          else console.log('return the final error', err)
        }

        // return Promise.reject(err)
      }
    );

    return () => {
      privateApi.interceptors.request.eject(requestInterceptor);
      privateApi.interceptors.response.eject(responseInterceptor);
    };
  }, [auth]);

  return privateApi;
};
export default useAuth