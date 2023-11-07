import axios from 'axios'
import store from '../store'


const api = axios.create({
    baseURL:'http://localhost:3000',
    headers : {'Content-Type':'application/json'},
})
axios.defaults.withCredentials = true;

export const privateApi = axios.create({
    baseURL:'http://localhost:3000',
    headers : {'Content-Type':'application/json'},
    withCredentials:true
})



 privateApi.interceptors.request.use(
    (config) => {
        console.log('req inter', config)
        let state = store.getState()
        console.log(state)
      if (!config?.headers?.['Authorization']) {
        config.headers[`Authorization`] = `Bearer ${state?.auth?.auth?.token}`;
        config.headers[`Content-Type`] = `application/json`;
      }
      return config;
  },
  (err) => Promise.reject(err)
  );
  
 privateApi.interceptors.response.use(
      (res) => res,
      async (err,config) => {
          const prevReq = err && err.config;
          console.log(" error res inter",prevReq, err)
          if (!prevReq &&!prevReq?.sent) {
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
export default api