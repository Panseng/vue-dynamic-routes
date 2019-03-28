import axios from 'axios'
import { baseUrl } from '@/config/env'
import { getStorage, clearAll } from '@/utils/storage'

const request = axios.create({
  baseURL: baseUrl,
  timeout: 5000
})

request.interceptors.request.use(
  config => {
    if (getStorage('token')) {
      config.headers['X-Token'] = getStorage('token')
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
        clearAll()
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
