import { Method } from 'axios'
import service from '@/utils/request'

export interface HTTPConfig {
  url: string
  method: Method
  data?: { [key: string]: unknown }
  params?: { [key: string]: unknown }
}

const useHttp = <T>(config: HTTPConfig): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    service({
      url: config.url,
      method: config.method,
      data: config.data || {},
      params: config.params || {}
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default useHttp
