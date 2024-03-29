import type { HasRole } from 'types/store'

export interface LoginData {
  username: string
  password: string
  code: string
  rememberMe: boolean
  verify: string
}

export interface InfoData {
  roles: string[]
  nickname: string
  authorities: HasRole[]
}
