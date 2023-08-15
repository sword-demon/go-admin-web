// 用于存储 token

// 定义 token 对应的常量
import { createGlobalState, useStorage } from '@vueuse/core'

export const STORAGE_AUTHORIZATION_KEY = 'Authorization'
export const STORAGE_REFRESH_TOKEN_KEY = 'REFRESH_TOKEN'

export const useAuthorization = createGlobalState(() =>
  useStorage<null | string>(STORAGE_AUTHORIZATION_KEY, null),
)

export const useRefreshToken = createGlobalState(() => useStorage<null | string>(STORAGE_REFRESH_TOKEN_KEY, null))
