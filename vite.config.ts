import { defineConfig, loadEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  console.log(root, env.VITE_USE_MOCK)
  return defineConfig({
    plugins: [
      vue(),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      viteMockServe({
        supportTs: true,
        mockPath: 'src/mock',
        localEnabled: env.VITE_USE_MOCK as unknown as boolean,
        watchFiles: true // 监视文件更改
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/var.scss";`
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      port: 9090,
      open: true,
      cors: true,
      host: true
    },
    build: {
      target: 'es2015',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  })
}
