import type { RouteRecordRaw } from 'vue-router';
import TeamsView from '@/views/TeamsView.vue';

export default [
  {
    path: '/equipes',
    name: 'teams',
    component: TeamsView,
    meta: {
      requiresAuth: true,
    },
  },
] as RouteRecordRaw[];
