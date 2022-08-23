import type { RouteRecordRaw } from 'vue-router';
import LeaguesView from '@/views/LeaguesView.vue';

export default [
  {
    path: '/leagues',
    name: 'leagues',
    component: LeaguesView,
    meta: {
      requiresAuth: true,
    },
  },
] as RouteRecordRaw[];