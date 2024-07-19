import type { RouteRecordRaw } from 'vue-router';
import CareersView from '@/views/CareersView.vue';

export default [
  {
    path: '/temporadas',
    name: 'careers',
    component: CareersView,
    meta: {
      requiresAuth: true,
    },
  },
] as RouteRecordRaw[];
