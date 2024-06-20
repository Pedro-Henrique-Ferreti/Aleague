import type { RouteRecordRaw } from 'vue-router';
import SeasonsView from '@/views/SeasonsView.vue';

export default [
  {
    path: '/temporadas',
    name: 'seasons',
    component: SeasonsView,
    meta: {
      requiresAuth: true,
    },
  },
] as RouteRecordRaw[];
