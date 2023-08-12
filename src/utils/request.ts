import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 8000,
})

service.interceptors.request.use(config => {
  return config
})

service.interceptors.response.use(resp => {
  return resp
}, error => {
  return Promise.reject(error)
})

export default service
