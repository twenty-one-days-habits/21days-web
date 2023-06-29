import request from './request'
  
export function postLogin( data:any ){
    return request({
        url: '/users/login',
        method: "post",
        data
    })
}

export function postRegister (data: any) {
    return request({
        url: '/users/register',
        method: "post",
        data
    })
}

export function logout () {
    return request({
        url: '/users/logout',
        method: "post",
    })
}