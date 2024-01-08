import type {
  StoreState,
  LoginPayload,
  RegisterPayload,
} from '@/types/Auth';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import api from '@/api';
import { useUserStore } from './user';

export const useAuthStore = defineStore('auth', {
  state: (): StoreState => {
    return {
      showSplashScreen: Boolean(Cookies.get(import.meta.env.VITE_ACCESS_TOKEN_COOKIE)),
      accessToken: null,
    };
  },
  getters: {
    userIsAuthenticated(state) {
      const userStore = useUserStore();

      return !!(state.accessToken && userStore.user);
    },
  },
  actions: {
    async login(payload: LoginPayload) {
      const userStore = useUserStore();

      const { data } = await api.authService.login(payload);

      userStore.user = data.user;

      this.setAccessToken(data.accessToken);
    },
    logout() {
      this.setAccessToken();
    },
    async register(payload: RegisterPayload) {
      const userStore = useUserStore();

      const { data } = await api.authService.register(payload);

      userStore.user = data.user;

      this.setAccessToken(data.accessToken);
    },
    async getAuthenticatedUser() {
      const userStore = useUserStore();

      const { data: user } = await api.authService.getAuthenticatedUser();

      userStore.user = user;
    },
    setAccessToken(accessToken?: string) {
      if (!accessToken) {
        this.accessToken = '';

        Cookies.remove(import.meta.env.VITE_ACCESS_TOKEN_COOKIE);

        return;
      }

      this.accessToken = accessToken;

      Cookies.set(import.meta.env.VITE_ACCESS_TOKEN_COOKIE, accessToken);
    },
    async reloadUser() {
      this.showSplashScreen = true;

      try {
        await this.getAuthenticatedUser();
        this.setAccessToken(Cookies.get(import.meta.env.VITE_ACCESS_TOKEN_COOKIE));
      } catch (error) {
        this.setAccessToken();
      } finally {
        this.showSplashScreen = false;
      }
    },
  },
});
