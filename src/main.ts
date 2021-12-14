import { createApp } from 'vue'
import router from './routers/routers'
import { createPinia } from 'pinia'
import App from './App.vue'

import '@/styles/index.scss'
import 'element-plus/dist/index.css'
const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)

app.mount('#app')
