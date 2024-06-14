import type { RouteRecordRaw } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';

export default [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { layout: 'auth' },
  },
  {
    path: '/nova-conta',
    name: 'register',
    component: RegisterView,
    meta: { layout: 'auth' },
  },
] as RouteRecordRaw[];
