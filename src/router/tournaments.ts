import type { RouteRecordRaw } from 'vue-router';
import TournamentsView from '@/views/TournamentsView.vue';

export default [
  {
    path: '/campeonatos',
    name: 'tournaments',
    component: TournamentsView,
    meta: {
      requiresAuth: true,
    },
  },
] as RouteRecordRaw[];
