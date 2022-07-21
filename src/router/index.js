import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import authRoutes from './auth';
import HomeView from '@/views/HomeView.vue';

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
      component: HomeView,
      meta: { layout: 'home' },
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