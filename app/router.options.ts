import type { RouterConfig } from '@nuxt/schema';

export default {
  routes: _routes => [
    {
      name: 'home',
      path: '/',
      component: () => import('~/pages/Home.vue'),
    },
    {
      name: 'analytics',
      path: '/analytics',
      component: () => import('~/pages/Analytics.vue'),
    },
  ],
} satisfies RouterConfig;
