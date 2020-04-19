import axios from 'axios'

 let ajax = axios.create({
    baseURL: 'http://127.0.0.1:7001/admin/',
    timeout: 1000,

  });

  export default ajax