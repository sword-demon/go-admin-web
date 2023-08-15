import { defineStore } from 'pinia'

const useUserStore = defineStore('userState', {
  state: () => ({
    // token
    token: '',
    refreshToken: '',
    userInfo: {
      avatar: '',
      nickname: '',
      sex: '',
    },
    // 角色
    roles: [],
  }),
  getters: {},
  actions: {
    // 设置 token
    setToken(token: string) {
      this.token = token
    },
    setRefreshToken(refreshToken: string) {
      this.refreshToken = refreshToken
    },
    // 设置登录用户的信息
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    },
    // 更新部分信息
    setUserPartInfo(userInfo: any) {
      this.userInfo.avatar = userInfo.avatar
      this.userInfo.sex = userInfo.sex
      this.userInfo.nickname = userInfo.nickname
    },
  },
  persist: true,
})

export default useUserStore
