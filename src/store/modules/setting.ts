import { defineStore } from 'pinia'

const useSettingStore = defineStore('settingState', {
  state: () => ({
    // 菜单是否收缩
    isCollapse: true, // 默认展开
  }),
  getters: {},
  actions: {
    // 切换展开状态
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
  },
})

export default useSettingStore
