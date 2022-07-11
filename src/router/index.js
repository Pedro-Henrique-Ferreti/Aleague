import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import PasswordRecoveryView from '@/views/PasswordRecoveryView.vue';
import VerifyEmailView from '@/views/VerifyEmailView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: 'home' },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { layout: 'auth' },
    },
    {
      path: '/cadastre-se',
      name: 'register',
      component: RegisterView,
      meta: { layout: 'auth' },
    },
    {
      path: '/recuperar-senha',
      name: 'password-recovery',
      component: PasswordRecoveryView,
      meta: { layout: 'auth' },
    },
    {
      path: '/verificar-email',
      name: 'verify-email',
      component: VerifyEmailView,
      meta: { layout: 'auth' },
    },
  ],
});

export default router;