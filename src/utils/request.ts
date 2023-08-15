import axios from 'axios'
import useUserStore from '@/store/modules/user.ts'

const service = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 8000,
})

service.interceptors.request.use(config => {
  const userStore = useUserStore()
  const token = userStore.token
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
})

service.interceptors.response.use(resp => {
  return resp
}, error => {
  return Promise.reject(error)
})

export default service
