import type {
  SessionCookie, AuthPayload, AuthStoreState, RegisterPayload,
} from '@/types/Auth';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import api from '@/api';

export const useAuthStore = defineStore('auth', {
  state: (): AuthStoreState => ({
    user: null,
    accessToken: null,
  }),
  getters: {
    userIsAuthenticated: (state) => !!state.accessToken && !!state.user,
  },
  actions: {
    async login(payload: AuthPayload) {
      const { data } = await api.authService.authenticate(payload);

      this.setSessionCookie(data);
    },
    async register(payload: RegisterPayload) {
      const { data } = await api.authService.register(payload);

      this.setSessionCookie(data);
    },
    setSessionCookie(cookie?: SessionCookie) {
      if (!cookie) {
        this.accessToken = null;
        this.user = null;

        Cookies.remove(import.meta.env.VITE_SESSION_COOKIE);

        return;
      }

      this.accessToken = cookie.accessToken;
      this.user = cookie.user;

      Cookies.set(import.meta.env.VITE_SESSION_COOKIE, JSON.stringify(cookie));
    },
    async reloadUser() {
      const cookie = Cookies.get(import.meta.env.VITE_SESSION_COOKIE);

      if (cookie) {
        this.setSessionCookie(JSON.parse(cookie));
      }
    },
    logout() {
      Cookies.remove(import.meta.env.VITE_SESSION_COOKIE);
      document.location.replace(`${document.location.origin}login`);
    },
  },
});
