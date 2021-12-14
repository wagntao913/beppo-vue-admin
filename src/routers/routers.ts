import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/user/login.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/layout',
      name: 'Layout',
      component: () => import('@/layout/Layout.vue')
    }
  ]
})

export default router
