import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ElNotification } from 'element-plus'
import router from '@/router'
import { STORAGE_AUTHORIZATION_KEY, useAuthorization } from '@/composables/authorization'

// 定义后端返回的固定的数据格式
export interface ResponseBody<T = any> {
  code: number
  data?: T
  msg: string
}

const service = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 60000,
})

const requestHandler = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  const authorization = useAuthorization()
  if (authorization.value) {
    config.headers.set(STORAGE_AUTHORIZATION_KEY, 'Bearer ' + authorization.value)
  }
  return config
}

const responseHandler = (
  response: any,
): ResponseBody<any> | AxiosResponse<any> | Promise<any> | any => {
  return response.data
}

const errorHandler = (error: AxiosError): Promise<any> => {
  const token = useAuthorization()
  if (error.response) {
    // 代表请求已经通了
    const { data, status, statusText } = error.response as AxiosResponse<ResponseBody>
    if (status === 401) {
      ElNotification?.error({
        title: '登录过期',
        message: data?.msg || statusText,
        duration: 3000,
      })
      // 先清空 token 否则会造成 重定向 循环判断
      token.value = null
      // 401 跳转到登录页
      router
        .replace({ path: '/login', query: { redirect: router.currentRoute.value.path } })
        .then(() => {
        })
    } else if (status === 403) {
      ElNotification?.error({
        title: '资源请求错误',
        message: data?.msg || statusText,
        duration: 3000,
      })
    } else if (status === 500) {
      ElNotification?.error({
        title: '服务器错误',
        message: data?.msg || statusText,
        duration: 3000,
      })
    } else {
      ElNotification?.error({
        title: '系统错误',
        message: data?.msg || statusText,
        duration: 3000,
      })
    }
  }
  return Promise.reject(error)
}

service.interceptors.request.use(requestHandler)
service.interceptors.response.use(responseHandler, errorHandler)

export const useGet = <T = any, R = any>(
  url: string,
  params?: T,
  config?: InternalAxiosRequestConfig,
): Promise<ResponseBody<R>> => {
  return service.request({
    url,
    params,
    method: 'GET',
    ...config,
  })
}

export const usePost = <T = any, R = any>(
  url: string,
  data?: T,
  config?: InternalAxiosRequestConfig,
): Promise<ResponseBody<R>> => {
  return service.request({
    url,
    data,
    method: 'POST',
    ...config,
  })
}

export const usePut = <T = any, R = any>(
  url: string,
  data?: T,
  config?: InternalAxiosRequestConfig,
): Promise<ResponseBody<R>> => {
  return service.request({
    url,
    data,
    method: 'PUT',
    ...config,
  })
}

export const useDelete = <T = any, R = any>(
  url: string,
  data?: T,
  config?: InternalAxiosRequestConfig,
): Promise<ResponseBody<R>> => {
  return service.request({
    url,
    data,
    method: 'DELETE',
    ...config,
  })
}

