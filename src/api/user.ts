import useHttp from '@/hooks/useHttp'
import { BaseResponse } from './types'

export interface LoginParams {
  account: string
  password: string
  code: string
}

export const login = (params: LoginParams) => {
  return useHttp<BaseResponse<LoginParams>>({
    url: '/v1/user/login',
    method: 'POST',
    data: { ...params }
  })
}

export const getVerfciation = () => {
  return useHttp<BaseResponse<{ code: string }>>({
    url: '/v1/user/getVerfication',
    method: 'GET'
  })
}
