// 获取树形菜单列表
import { useGet, usePost } from '@/utils/request'

const restFulUserUrl = '/user'

interface AddUserRequest {
  username: string
  phone: string
  password: string
  remarks?: string
  email?: string
}

export const getUserListApi = (params?: object) => {
  return useGet(restFulUserUrl, params)
}
export const addUserApi = (params: AddUserRequest) => {
  return usePost(restFulUserUrl, params)
}
