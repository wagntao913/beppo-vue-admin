## 依赖安装与使用
#### git@github.com:wagntao913/beppo-vue-admin.git
#### vue-router

```bash
  yarn add vue-router@4
```

```ts
// routers/route.ts
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: []
})

export default router
```

```ts
// main.ts
import router from './routers/routers'

const app = createApp(App)
app.use(router)
```

#### element-plus

```bash
yarn add element-plus
```

```ts
//vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
.....
plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  .....
```

### iconify

```bash
yarn add --dev @iconify/vue
```

```ts
// components/Bicon
<template>
  <div class="inline-block mx-0.5">
    <Icon :icon="icon" :height="height" />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { defineProps } from 'vue'
const props = defineProps<{
  icon: string
  height?: string
}>()
</script>

```

### Mock

```bash
yarn add mockjs
yarn add vite-plugin-mock
```

```ts
// vite.config.ts
import { viteMockServe } from 'vite-plugin-mock'

......
plugin:[
  viteMockServe({
    supportTs: true,
    mockPath: 'src/mock',
    localEnabled: env.VITE_USE_MOCK as unknown as boolean,
    watchFiles: true // 监视文件更改
  })
]
```

```js
// mock/index.ts

import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

export default [
  {
    url:'/v1/user/getVerficationCode',
    method: '',
    response: {
      code: 200,
      msg: '验证码获取成功'，
      data: {
        code: Mock.mock(`@string("${verficationCodeTem}", 5)`)
      }
    }
  }
] as MockMethod[]

```

### Axios

```bash
yarn add axios
```

```ts
// utils/request
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseUrl: impor.meta.env.VITE_APP_BASE_URL,
  timeout: 20000
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 设置token，jwt鉴权
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response || {}
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
      ElMessage.error('网路异常，请稍后重试！')
    }
  }
)

export default service
```

```ts
// hooks/useHttp.ts
import service from '@/utils/request'
import { Method } from 'axios'

interface HTTPConfig {
  url: string
  method: Method
  data?: {[key:string]: any}
  params?: {[key:string]: any}
}

const useHttp = <T>(config: HTTPConfig): Promise<T> => {
  return New Promise((reslove,reject) => {
    service({
      url: config.url,
      method: config.method,
      data: config.data || {},
      params: config.params || {}
    }).then(res=>{
      reslove(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export default useHttp
```

```ts
// api/types
export interface BaseResponse<T> {
  code: number
  msg: string
  data: T
}
```

```ts
// api/user.ts
import useHttp from '@/hooks/useHttp'
import { BaseResponse } from '@/api/typs'

export const getVerfication = () => {
  return useHttp:<BaseResponse<{code: string}>>({
    url: '/v1/user/getVerficationCode',
    method: 'GET'
  })
}

export interface LoginParams {
  account: string
  password: string
  code: string
}

export const login = (params: LoginParams) => {
  return useHttp:<BaseResponse<LoginParams>>({
    url: '/v1/use/login',
    method: 'POST',
    data: {...params}
  })
}
```
