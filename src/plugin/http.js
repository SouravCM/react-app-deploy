import axios from "axios";

import CookiesServices from '../services/CookiesServices';
import { apiEndpoint } from "../config";

axios.defaults.withCredentials=true;

const http = axios.create({
  baseURL: apiEndpoint,withCredentials:true
})
 
export const setupInterceptors = (navigate) => {
   
  http.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.withCredentials = true;
    config.headers.set('Access-Control-Allow-Origin','*');
    config.headers.set('Content-Type', 'application/json');
    config.headers.set('access-token',CookiesServices.get('access-token')); 
     return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
  http.interceptors.response.use(res => {
    // success
    return res
  }, err => {
    const { status } = err.response
  console.log('err',err);
    if (status === 401) {
      // here we have access of the useHistory() from current Router
      navigate('/login')
    }
  
    return Promise.reject(err)
  })
}

export default http