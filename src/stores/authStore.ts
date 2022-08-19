import type { AuthStoreState, LoginProps, RegisterProps, ResetPasswordProps, ValidatePasswordResetTokenProps } from '@/types/AuthStore';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import axios from '@/helpers/axios';
import { useUserStore } from './userStore';

export const useAuthStore = defineStore('auth', {
  state: (): AuthStoreState => {
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
    async login({ email, password }: LoginProps) {
      const userStore = useUserStore();

      const { data } = await axios.post('/auth/login', {
        email,
        password,
      });

      userStore.user = data.user;

      this.setAccessToken(data.accessToken);
    },
    logout() {
      this.setAccessToken();
    },
    async register({ username, email, password, passwordConfirmation }: RegisterProps) {
      const userStore = useUserStore();

      const { data } = await axios.post('/auth/register', {
        username,
        email,
        password,
        passwordConfirmation,
      });

      userStore.user = data.user;

      this.setAccessToken(data.accessToken);
    },
    sendEmailVerificationCode() {
      const { user } = useUserStore();

      return axios.post('/auth/verify-email/resend', {
        email: user?.email,
      });
    },
    verifyEmailAddress(code: string) {
      const { user } = useUserStore();

      return axios.post('/auth/verify-email', {
        email: user?.email,
        code,
      });
    },
    sendPasswordRecoveryEmail(email: string) {
      return axios.post('/auth/password/forgot', {
        email,
      });
    },
    resetPassword({ email, token, password, passwordConfirmation }: ResetPasswordProps) {
      return axios.post('/auth/password/reset', {
        email,
        token,
        password,
        passwordConfirmation,
      });
    },
    async validatePasswordResetToken({ email, token }: ValidatePasswordResetTokenProps) {
      const { data } = await axios.post('/auth/password/validate-token', {
        email,
        token,
      });

      return data;
    },
    async getAuthenticatedUser() {
      const userStore = useUserStore();

      const { data: user } = await axios.get('/auth/me');

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
