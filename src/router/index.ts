import { createRouter, createWebHistory } from 'vue-router'
import startPage from '../pages/startPage.vue'
import gamePage from '../pages/gamePage.vue'
import hiScores from '../pages/hiScores.vue'
import userPage from '../pages/userPage.vue'
import forgotPasswordPageVue from '@/pages/forgotPasswordPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'startPage',
      component: startPage
    },
    {
      path: '/gamePage',
      name: 'gamePage',
      component: gamePage
    },
    {
      path: '/totals',
      name: 'totals',
      component: hiScores
    },
    {
      path: "/userPage",
      name: "userPage",
      component: userPage
    },
    {
      path: "/forgotPasswordPage",
      name: "forgotPasswordPage",
      component: forgotPasswordPageVue
    }
  ]
})

export default router
