import { createRouter, createWebHistory } from 'vue-router';
import LandingPageView from '@/views/LandingPageView.vue';
import authRoutes from './auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authRoutes,
    {
      path: '/',
      name: 'landing-page',
      component: LandingPageView,
      meta: { layout: 'landing-page' },
    },
  ],
});

export default router;
