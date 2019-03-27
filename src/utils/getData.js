import request from './request'

export function login (username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo () {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logOut () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
