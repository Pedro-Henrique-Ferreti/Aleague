import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useTitle } from '@/composables/useTitle';
import authRoutes from './auth';
import tournamentsRoutes from './tournaments';

async function reloadUser() {
  const authStore = useAuthStore();
  await authStore.reloadUser();
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authRoutes,
    ...tournamentsRoutes,
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'tournaments', params: {} },
    },
  ],
});

router.beforeEach(async (to) => {
  await reloadUser();
  const { userIsAuthenticated } = useAuthStore();

  let redirect;

  if (to.meta.requiresAuth && !userIsAuthenticated) {
    redirect = { name: 'login' };
  }

  return redirect;
});

router.afterEach((to) => {
  if (to.meta.pageTitle) {
    useTitle(to.meta.pageTitle);
  }
});

export default router;
