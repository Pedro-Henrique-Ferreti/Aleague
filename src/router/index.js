import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import authRoutes from './auth';
import LandingView from '@/views/LandingView.vue';

const userIsAuthenticated = () => {
  const authStore = useAuthStore();

  return authStore.userIsAuthenticated;
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingView,
      meta: { layout: 'landing' },
      beforeEnter: () => {
        const { userIsAuthenticated, user } = useAuthStore();

        if (userIsAuthenticated && !user.emailVerifiedAt) {
          return { name: 'verify-email' };
        }
      },
    },
    ...authRoutes,
  ],
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !userIsAuthenticated()) {
    return { name: 'login' };
  }
});

export default router;