import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import LandingPageView from '@/views/LandingPageView.vue';
import authRoutes from './auth';
import careersRoutes from './careers';
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
    return { name: 'teams' };
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authRoutes,
    ...teamsRoutes,
    ...careersRoutes,
    ...tournamentsRoutes,
    {
      path: '/',
      name: 'landing-page',
      component: LandingPageView,
      meta: { layout: 'landing-page' },
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

export default router;
