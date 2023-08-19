type IncludeNull<T> = T | null

export interface LoginFormRequest {
  username: IncludeNull<string>
  password: IncludeNull<string>
}

export interface LoginFormResponse {
  token: string
  refresh_token: string
}

export interface UserInfo {
  id?: number
  avatar?: string
  nickname?: string
  sex?: number
}
