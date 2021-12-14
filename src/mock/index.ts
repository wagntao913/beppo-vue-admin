import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

const verficationCodeTem = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'

export default [
  {
    url: '/v1/user/getVerfication',
    method: 'get',
    response: () => {
      return {
        code: 200,
        msg: '验证码生成成功',
        data: {
          code: Mock.mock(`@string("${verficationCodeTem}", 5)`)
        }
      }
    }
  },
  {
    url: '/v1/user/login',
    method: 'POST',
    response: () => {
      return {
        code: 200,
        msg: '登录成功',
        data: Mock.mock({
          userId: '@id',
          token: '@guid',
          username: '@name'
        })
      }
    }
  }
] as MockMethod[]
