import axios from 'axios'
 const  http =process.env.NODE_ENV=='production'?'http://112.74.102.85:7001':'http://112.74.102.85:7001'
 
 let ajax = axios.create({
    baseURL: http+'/front/',
    timeout: 1000,

  });
 console.log('环境地址',http);
 
  export default ajax