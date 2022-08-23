import type { RouteRecordRaw } from 'vue-router';
import TeamsView from '@/views/TeamsView.vue';

export default [
  {
    path: '/teams',
    name: 'teams',
    component: TeamsView,
    meta: {
      requiresAuth: true,
    },
  },
] as RouteRecordRaw[];