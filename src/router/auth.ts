import type { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import VerifyEmailView from '@/views/VerifyEmailView.vue';
import RecoverPasswordView from '@/views/RecoverPasswordView.vue';

async function reloadUser() {
  const authStore = useAuthStore();
  await authStore.reloadUser();
}

async function notAuthenticatedGuard() {
  await reloadUser();
  const { userIsAuthenticated } = useAuthStore();

  if (userIsAuthenticated) {
    return { name: 'teams' };
  }
}

export default [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { layout: 'auth' },
    beforeEnter: notAuthenticatedGuard,
  },
  {
    path: '/nova-conta',
    name: 'register',
    component: RegisterView,
    meta: { layout: 'auth' },
    beforeEnter: notAuthenticatedGuard,
  },
  {
    path: '/recuperar-senha',
    name: 'recover-password',
    component: RecoverPasswordView,
    meta: { layout: 'auth' },
    beforeEnter: notAuthenticatedGuard,
  },
  {
    path: '/verificar-email',
    name: 'verify-email',
    component: VerifyEmailView,
    meta: {
      layout: 'auth',
      requiresAuth: true,
    },
    beforeEnter() {
      const { user } = useAuthStore();

      if (user?.emailVerifiedAt) {
        return { name: 'teams' };
      }
    },
  },
] as RouteRecordRaw[];
