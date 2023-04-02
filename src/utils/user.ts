import request from './request'
  
export function postLogin( data:any ){
    return request({
        url: '/users/login',
        method: "post",
        data
    })
}