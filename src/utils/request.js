import axios from 'axios'
// import store from '@/store'
import { baseUrl } from '@/config/env'
import { getSessionStorage, clearSessionStorage } from '@/utils/sessionStorage'

const request = axios.create({
  baseURL: baseUrl,
  timeout: 5000
})

request.interceptors.request.use(
  config => {
    if (getSessionStorage('token')) {
      config.headers['X-Token'] = getSessionStorage('token')
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    if (response.data.code !== 20000) {
      // 无效token
      if (response.data.code === 50002) {
        clearSessionStorage()
      }
      return Promise.reject(response.data.code)
    } else {
      return response.data
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default request
