import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: 'home' },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { layout: 'auth' },
    },
  ],
});

export default router;