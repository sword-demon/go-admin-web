// 获取树形菜单列表
import { useGet } from '@/utils/request'

const userMenuListUrl = 'http://localhost:5173/menu.json'

export const getMenuListApi = (params?: object) => {
  return useGet(userMenuListUrl, params)
}
