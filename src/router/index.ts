import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import authRoutes from './auth';
import competitionsRoutes from './competitions';
import teamsRoutes from './teams';
import LandingView from '@/views/LandingView.vue';
import HomeView from '@/views/HomeView.vue';
import DeleteAccountView from '@/views/DeleteAccountView.vue';
import GoodbyeView from '@/views/GoodbyeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authRoutes,
    ...competitionsRoutes,
    ...teamsRoutes,
    {
      path: '/',
      name: 'landing',
      component: LandingView,
      meta: { layout: 'landing' },
      beforeEnter: () => {
        const { userIsAuthenticated } = useAuthStore();
        const { user } = useUserStore();

        if (userIsAuthenticated && !user?.emailVerifiedAt) {
          return { name: 'verify-email' };
        }

        if (userIsAuthenticated) {
          return { name: 'home' };
        }
      },
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      beforeEnter: () => {
        const { userIsAuthenticated } = useAuthStore();

        if (!userIsAuthenticated) {
          return { name: 'landing' };
        }
      },
    },
    {
      path: '/delete-account',
      name: 'delete-account',
      component: DeleteAccountView,
      meta: { requiresAuth: true },
    },
    {
      path: '/goodbye',
      name: 'goodbye',
      component: GoodbyeView,
      meta: { layout: 'notFound' },
      beforeEnter: (_, from) => {
        if (from.name !== 'delete-account') {
          return { name: 'landing' };
        }
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { layout: 'notFound' },
    },
  ],
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  const { reloadUser } = authStore;
  let { userIsAuthenticated } = authStore;

  const accessToken = Cookies.get(import.meta.env.VITE_ACCESS_TOKEN_COOKIE);

  if (accessToken && !userIsAuthenticated) {
    await reloadUser();

    const { userIsAuthenticated: newAuthenticated } = useAuthStore();

    userIsAuthenticated = newAuthenticated;
  }

  if (to.meta.requiresAuth && !userIsAuthenticated) {
    return { name: 'login' };
  }
});

export default router;