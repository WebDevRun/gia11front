import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Infomation',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Infomation.vue')
  },
  {
    path: '/uploadfiles',
    name: 'UploadFiles',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/UploadFiles.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/About.vue')
  },
  {
    path: '/controlpanel',
    name: 'ControlPanel',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/ControlPanel.vue')
  },
  {
    path: '/signin',
    name: 'SignInLayout',
    meta: { layout: 'signin' },
    component: () => import('../layouts/SignInLayout.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = localStorage.getItem('accessToken')
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/signin')
  } else {
    next()
  }
})

export default router
