import type { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';

async function reloadUser() {
  const authStore = useAuthStore();
  await authStore.reloadUser();
}

async function notAuthenticatedGuard() {
  await reloadUser();
  const { userIsAuthenticated } = useAuthStore();

  if (userIsAuthenticated) {
    return { name: 'tournaments' };
  }
}

export default [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { layout: 'auth', pageTitle: 'Entrar' },
    beforeEnter: notAuthenticatedGuard,
  },
  {
    path: '/nova-conta',
    name: 'register',
    component: RegisterView,
    meta: { layout: 'auth', pageTitle: 'Nova conta' },
    beforeEnter: notAuthenticatedGuard,
  },
] as RouteRecordRaw[];
