import { createRouter, createWebHistory } from 'vue-router';
import { getCurrentUser } from 'vuefire';
import HomeView from '@/views/HomeView.vue';
import SingupView from '@/views/SignupView.vue';
import SigninView from '@/views/SigninView.vue';
import DashboardView from '@/views/DashboardView.vue';
import RecoverView from '@/views/RecoverView.vue';

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
      path: '/signup',
      name: 'signup',
      component: SingupView,
    },
    {
      meta: { requiresAuth: false },
      path: '/login',
      name: 'login',
      component: SigninView,
    },
    {
      meta: { requiresAuth: false },
      path: '/recover',
      name: 'recover',
      component: RecoverView,
    },
  ],
});

router.beforeEach(async (to) => {
  // routes with `meta: { requiresAuth: true }` will check for the users
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return {
        path: '/login',
        query: {
          // we keep the current path in the query so we can redirect to it after login
          // with `router.push(route.query.redirectTo || '/')`
          redirectTo: to.fullPath,
        },
      };
    }
  }
});

export default router;
