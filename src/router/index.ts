import { createRouter, createWebHistory } from 'vue-router'
import startPage from '../pages/startPage.vue'
import gamePage from '../pages/gamePage.vue'
import hiScores from '../pages/hiScores.vue'

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
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('')
    // }
  ]
})

export default router
