import { useDelete, useGet, usePost, usePut } from '@/utils/request'

const restFulRoleUrl = '/role'
const userDetailUrl = '/role/detail'

interface AddRoleRequest {
  name: string
  remarks?: string
  sort?: number
  is_admin?: number
}

export interface UpdateRoleRequest extends AddRoleRequest {
  id: number
}

interface RoleDetail extends AddRoleRequest {
  id: number | undefined
}

export const getRoleListApi = (params?: object) => {
  return useGet(restFulRoleUrl, params)
}
export const addRoleApi = (params: AddRoleRequest) => {
  return usePost(restFulRoleUrl, params)
}

export const updateRoleApi = (params: UpdateRoleRequest) => {
  return usePut(restFulRoleUrl, params)
}

export const detailRoleApi = (id: number) => {
  return useGet<any, RoleDetail>(userDetailUrl, { id: id })
}
export const deleteRoleApi = (id: number) => {
  return useDelete(restFulRoleUrl + '/' + id)
}
