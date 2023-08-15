import { defineStore } from 'pinia'
import type { LoginFormRequest, UserInfo } from '@/api/type'
import { loginApi, userGetInfoApi } from '@/api/login'
import { useAuthorization, useRefreshToken } from '@/composables/authorization'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo>()
  const token = useAuthorization()
  const refresh_token = useRefreshToken()
  // const roles = []

  const setUserInfo = (info: UserInfo | undefined) => {
    userInfo.value = info
  }

  const setToken = (key: string | null) => {
    token.value = key
  }
  const setRefreshToken = (key: string | null) => {
    refresh_token.value = key
  }

  const login = async (params: LoginFormRequest) => {
    const { data } = await loginApi(params)
    if (data?.token) {
      setToken(data.token)
    }
    if (data?.refresh_token) {
      setRefreshToken(data.refresh_token)
    }
  }

  const getUserInfo = async (id: number) => {
    const { data } = await userGetInfoApi(id)
    if (data) {
      setUserInfo(data)
    }
  }

  const logout = async () => {
    setToken('')
    setUserInfo(undefined)
    ElMessage.success({ message: '退出成功' })
    await router.replace({
      path: '/login',
      query: {
        redirect: router.currentRoute.value.path,
      },
    })
  }

  return {
    userInfo,
    token,
    refresh_token,
    login,
    setUserInfo,
    getUserInfo,
    logout,
  }
})

// const useUserStore = defineStore('userState', {
//   state: () => ({
//     // token
//     token: useAuthorization(),
//     refreshToken: '',
//     userInfo: {
//       avatar: '',
//       nickname: '',
//       sex: '',
//     },
//     // 角色
//     roles: [],
//   }),
//   getters: {},
//   actions: {
//     // 设置 token
//     setToken(token: string) {
//       this.token = token
//     },
//     setRefreshToken(refreshToken: string) {
//       this.refreshToken = refreshToken
//     },
//     // 设置登录用户的信息
//     setUserInfo(userInfo: any) {
//       this.userInfo = userInfo
//     },
//     // 更新部分信息
//     setUserPartInfo(userInfo: any) {
//       this.userInfo.avatar = userInfo.avatar
//       this.userInfo.sex = userInfo.sex
//       this.userInfo.nickname = userInfo.nickname
//     },
//     async login(params: LoginFormRequest) {
//       const { data } = await loginApi(params)
//       if (data?.token) {
//         this.setToken(data.token)
//       }
//       if (data?.refresh_token) {
//         this.setRefreshToken(data.refresh_token)
//       }
//     },
//   },
//   persist: true,
// })
//
// export default useUserStore
