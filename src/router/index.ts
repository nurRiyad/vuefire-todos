import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'

const HomeView = () => import('@/views/HomeView.vue')
const SigninView = () => import('@/views/SigninView.vue')
const DashboardView = () => import('@/views/DashboardView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      meta: { requiresAuth: false },
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      meta: { requiresAuth: true },
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      meta: { requiresAuth: false },
      path: '/signin',
      name: 'signin',
      component: SigninView,
    },
  ],
})

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        path: '/signin',
      }
    }
  }
})

export default router
