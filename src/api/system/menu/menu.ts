// 获取树形菜单列表
import request from '@/utils/request'

export const getMenuListApi = (params?: object) => {
  return request({
    url: 'http://localhost:5173/menu.json',
    method: 'get',
    params,
  })
}
