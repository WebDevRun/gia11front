import { createRouter, createWebHistory } from 'vue-router'
import Infomation from '../views/Infomation.vue'

const routes = [
  {
    path: '/',
    name: 'Infomation',
    component: Infomation
  },
  {
    path: '/uploadfiles',
    name: 'UploadFiles',
    component: () => import('../views/UploadFiles.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
