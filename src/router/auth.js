import { useAuthStore } from '@/stores/authStore';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import PasswordRecoveryView from '@/views/PasswordRecoveryView.vue';
import VerifyEmailView from '@/views/VerifyEmailView.vue';

const notAuthenticatedGuard = () => {
  const authStore = useAuthStore();

  if (authStore.userIsAuthenticated) {
    return { name: 'home' };
  }
};

export default [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { layout: 'auth' },
    beforeEnter: notAuthenticatedGuard,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { layout: 'auth' },
    beforeEnter: notAuthenticatedGuard,
  },
  {
    path: '/password-recovery',
    name: 'password-recovery',
    component: PasswordRecoveryView,
    meta: { layout: 'auth' },
    beforeEnter: notAuthenticatedGuard,
  },
  {
    path: '/verify-email',
    name: 'verify-email',
    component: VerifyEmailView,
    meta: {
      layout: 'auth',
      requiresAuth: true,
    },
    beforeEnter: (_, from) => {
      if ( !['login', 'register'].includes(from.name)) {
        return { name: 'home' };
      }
    },
  },
];
