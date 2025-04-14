import type { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import VerifyEmailView from '@/views/VerifyEmailView.vue';
import RecoverPasswordView from '@/views/RecoverPasswordView.vue';
import ResetPasswordView from '@/views/ResetPasswordView.vue';

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
  {
    path: '/recuperar-senha',
    name: 'recover-password',
    component: RecoverPasswordView,
    meta: { layout: 'auth', pageTitle: 'Recuperar senha' },
    beforeEnter: notAuthenticatedGuard,
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPasswordView,
    meta: { layout: 'auth', pageTitle: 'Redefinir senha' },
    beforeEnter: notAuthenticatedGuard,
  },
  {
    path: '/verificar-email',
    name: 'verify-email',
    component: VerifyEmailView,
    meta: {
      layout: 'auth',
      requiresAuth: true,
      pageTitle: 'Verificar email',
    },
    beforeEnter() {
      const { user } = useAuthStore();

      if (user?.emailVerifiedAt) {
        return { name: 'tournaments' };
      }
    },
  },
] as RouteRecordRaw[];
