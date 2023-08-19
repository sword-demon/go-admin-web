// 获取树形菜单列表
import { useGet } from '@/utils/request'

const userListApi = '/user'

export const getUserListApi = (params?: object) => {
  return useGet(userListApi, params)
}
