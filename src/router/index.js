import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import authRoutes from './auth';
import LandingView from '@/views/LandingView.vue';
import HomeView from '@/views/HomeView.vue';

const userIsAuthenticated = () => {
  const authStore = useAuthStore();

  return authStore.userIsAuthenticated;
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authRoutes,
    {
      path: '/',
      name: 'landing',
      component: LandingView,
      meta: { layout: 'landing' },
      beforeEnter: () => {
        const { userIsAuthenticated, user } = useAuthStore();

        if (userIsAuthenticated && !user.emailVerifiedAt) {
          return { name: 'verify-email' };
        }

        if (userIsAuthenticated) {
          return { name: 'home' };
        }
      },
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      beforeEnter: () => {
        if (!userIsAuthenticated()) {
          return { name: 'landing' };
        }
      },
    },
  ],
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !userIsAuthenticated()) {
    return { name: 'login' };
  }
});

export default router;