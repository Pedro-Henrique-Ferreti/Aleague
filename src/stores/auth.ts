import type {
  StoreState,
  LoginPayload,
  RegisterPayload,
} from '@/types/Auth';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import api from '@/api';

export const useAuthStore = defineStore('auth', {
  state: (): StoreState => {
    return {
      showSplashScreen: Boolean(Cookies.get(import.meta.env.VITE_ACCESS_TOKEN_COOKIE)),
      accessToken: null,
      user: null,
    };
  },
  getters: {
    userIsAuthenticated: (state) => !!(state.accessToken && state.user),
  },
  actions: {
    async login(payload: LoginPayload) {
      const { data } = await api.authService.login(payload);

      this.user = data.user;
      this.setAccessToken(data.accessToken);
    },
    logout() {
      this.setAccessToken();
    },
    async register(payload: RegisterPayload) {
      const { data } = await api.authService.register(payload);

      this.user = data.user;
      this.setAccessToken(data.accessToken);
    },
    async getAuthenticatedUser() {
      const { data: user } = await api.authService.getAuthenticatedUser();

      this.user = user;
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
