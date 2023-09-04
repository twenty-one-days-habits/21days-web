import axios from 'axios';

//1. 创建axios对象
const request = axios.create({
  baseURL: '/api/'
});

//2. 请求拦截器
request.interceptors.request.use(config => {
  return config;
}, error => {
  Promise.reject(error);
});

//3. 响应拦截器
request.interceptors.response.use(response => {
  //判断code码
  return response;
}, ( data ) => {
  if(+data.response.status === 401) {
    const a = location.hash.split('?')[1]
    location.href = `/#/user/login?${a}`
  }
  return data.response;
});

export default request;