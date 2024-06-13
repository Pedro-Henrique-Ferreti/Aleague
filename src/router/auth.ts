import type { RouteRecordRaw } from 'vue-router';
import LoginView from '@/views/LoginView.vue';

export default [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { layout: 'auth' },
  },
] as RouteRecordRaw[];
