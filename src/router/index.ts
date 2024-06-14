import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import LandingPageView from '@/views/LandingPageView.vue';
import authRoutes from './auth';
import teamsRoutes from './teams';

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
  const { userIsAuthenticated } = useAuthStore();

  if (to.meta.requiresAuth && !userIsAuthenticated) {
    return { name: 'login' };
  }
});

export default router;
