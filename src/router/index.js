import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Infomation',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Infomation.vue')
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
    component: () => import('../views/ControlPanel.vue'),
    children: [
      {
        path: 'uploadfiles',
        name: 'UploadFiles',
        component: () => import('../templates/UploadFiles.vue')
      },
      {
        path: 'minscore',
        name: 'minScore',
        component: () => import('../templates/MinScore.vue')
      },
    ]
  },
  {
    path: '/signin',
    name: 'SignInLayout',
    meta: { layout: 'signin' },
    component: () => import('../layouts/SignInLayout.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
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
