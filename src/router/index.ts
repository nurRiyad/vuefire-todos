import { createRouter, createWebHistory } from 'vue-router';
import { getCurrentUser } from 'vuefire';
import HomeView from '@/views/HomeView.vue';
import SingupView from '@/views/SignupView.vue';
import SigninView from '@/views/SigninView.vue';
import DashboardView from '@/views/DashboardView.vue';
import RecoverView from '@/views/RecoverView.vue';
import VerifyView from '@/views/VerifyView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      meta: { requiresAuth: false, userVarified: false },
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      meta: { requiresAuth: true, userVarified: true },
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      meta: { requiresAuth: false, userVarified: true },
      path: '/signup',
      name: 'signup',
      component: SingupView,
    },
    {
      meta: { requiresAuth: false, userVarified: true },
      path: '/login',
      name: 'login',
      component: SigninView,
    },
    {
      meta: { requiresAuth: false, userVarified: true },
      path: '/recover',
      name: 'recover',
      component: RecoverView,
    },
    {
      meta: { requiresAuth: true, userVarified: true },
      path: '/verify',
      name: 'verify',
      component: VerifyView,
    },
  ],
});

router.beforeEach(async (to) => {
  // routes with `meta: { requiresAuth: true }` will check for the users
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser();
    console.log('currentuser-', currentUser);
    if (!currentUser) {
      return {
        path: '/signup',
        query: {
          // we keep the current path in the query so we can redirect to it after login
          // with `router.push(route.query.redirectTo || '/')`
          redirectTo: to.fullPath,
        },
      };
    } else {
      if (to.meta.userVarified) {
        if (!currentUser.emailVerified) {
          return {
            path: '/verify',
          };
        }
      }
    }
  }
});

export default router;
