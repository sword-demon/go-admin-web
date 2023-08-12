import { defineStore } from 'pinia'
import { getMenuListApi } from '@/api/system/menu/menu'

const useMenuStore = defineStore('menuState', {
  state: () => ({
    register: false, // 路由是否注册
    routers: [], // 路由数据
  }),
  getters: {},
  actions: {
    // 生成路由
    async generateRoute() {
      const { data } = await getMenuListApi()
      console.log('data', data)
      this.routers = data.result
      return data.result
    },
  },
  // 自动持久化
  persist: true,
})

export default useMenuStore
