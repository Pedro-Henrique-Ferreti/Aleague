import type { RouterConfig } from '@nuxt/schema';

export default {
  routes: _routes => [
    {
      name: 'welcome',
      path: '/',
      component: () => import('~/pages/Welcome.vue'),
    },
    {
      name: 'home',
      path: '/',
      meta: { middleware: 'has-imported-files' },
      component: () => import('~/pages/Home.vue'),
    },
    {
      name: 'editor',
      path: '/editor/:fileId/:tournamentId?',
      meta: { middleware: 'ensure-file-exists' },
      component: () => import('~/pages/Editor.vue'),
    },
    {
      name: 'analytics',
      path: '/analytics',
      meta: { middleware: 'has-imported-files' },
      component: () => import('~/pages/Analytics.vue'),
    },
  ],
} satisfies RouterConfig;
