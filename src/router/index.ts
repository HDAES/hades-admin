import { createWebHistory, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { createRouter } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/sys/login/index.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  //history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes
})

export function setupRouter(app: App<Element>) {
  app.use(router)
}
