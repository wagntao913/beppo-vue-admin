import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

interface ResponseData<T> {
  code: number
  desc: string
  msg: string
  data: T | unknown
}

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 20000, // 请求超时时间
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8;'
  }
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // config.headers!['Authorization'] = 'Bearer'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data || {}
    if (code !== 200) {
      return Promise.reject(msg)
    }
    if (code === 401) {
      return Promise.reject(msg)
    }
    return Promise.resolve(response)
  },
  (error: any) => {
    const { response } = error
    if (response) {
      ElMessage.error(response.msg)
    } else {
      ElMessage.warning('网络连接异常，请稍后重试')
    }
  }
)

export default service
