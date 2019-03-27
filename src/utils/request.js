import axios from 'axios'
// import store from '@/store'
import { baseUrl } from '@/config/env'

const request = axios.create({
  baseURL: baseUrl,
  timeout: 5000
})

export default request
