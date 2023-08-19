// 获取树形菜单列表
import { useGet, usePost, usePut } from '@/utils/request'

const restFulUserUrl = '/user'
const userDetailUrl = '/user/detail'

interface AddUserRequest {
  username: string
  phone: string
  password: string
  remarks?: string
  email?: string
}

export interface UpdateUserRequest extends AddUserRequest {
  id: number
}

interface UserDetail extends AddUserRequest {
  id: number | undefined
}

export const getUserListApi = (params?: object) => {
  return useGet(restFulUserUrl, params)
}
export const addUserApi = (params: AddUserRequest) => {
  return usePost(restFulUserUrl, params)
}

export const updateUserApi = (params: UpdateUserRequest) => {
  return usePut(restFulUserUrl, params)
}

export const detailUserApi = (id: number) => {
  return useGet<any, UserDetail>(userDetailUrl, { id: id })
}
