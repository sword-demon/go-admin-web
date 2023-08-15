import { useGet, usePost } from '@/utils/request'
import { LoginFormRequest, LoginFormResponse, UserInfo } from '@/api/type.ts'

export const userLoginUrl = '/login/password'
export const userGetInfoUrl = '/user/detail'

// 登录系统
export const loginApi = (data: LoginFormRequest) => {
  return usePost<LoginFormRequest, LoginFormResponse>(userLoginUrl, data)
}
export const userGetInfoApi = (id: number) => {
  return useGet<any, UserInfo>(userGetInfoUrl, { id: id })
}
