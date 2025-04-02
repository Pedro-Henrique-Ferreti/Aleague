import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useTitle } from '@/composables/useTitle';
import LandingPageView from '@/views/LandingPageView.vue';
import authRoutes from './auth';
import teamsRoutes from './teams';
import tournamentsRoutes from './tournaments';

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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authRoutes,
    ...teamsRoutes,
    ...tournamentsRoutes,
    {
      path: '/',
      name: 'landing-page',
      component: LandingPageView,
      meta: { layout: 'landing-page', pageTitle: 'A sua plataforma de campeonatos de futebol' },
      beforeEnter: notAuthenticatedGuard,
    },
  ],
});

router.beforeEach(async (to) => {
  await reloadUser();
  const { userIsAuthenticated, user } = useAuthStore();

  let redirect;

  if (to.meta.requiresAuth && !userIsAuthenticated) {
    redirect = { name: 'login' };
  } else if (
    to.meta.requiresAuth
    && !user?.emailVerifiedAt
    && to.name !== 'verify-email'
  ) {
    redirect = { name: 'verify-email' };
  }

  return redirect;
});

router.afterEach((to) => {
  if (to.meta.pageTitle) {
    useTitle(to.meta.pageTitle);
  }
});

export default router;
