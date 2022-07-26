import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import axios from '@/helpers/axios';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      accessToken: null,
      user: {
        avatar: '',
        createdAt: null,
        email: '',
        emailVerifiedAt: null,
        id: null,
        lastLoginAt: null,
        updatedAt: null,
        username: '',
      },
    };
  },
  getters: {
    userIsAuthenticated: (state) => Boolean(state.accessToken && state.user.id),
  },
  actions: {
    async login({ email, password }) {
      const { data } = await axios.post('/auth/login', {
        email,
        password,
      });

      this.user = data.user;

      this.setAccessToken(data.accessToken);
    },
    async register({ username, email, password, passwordConfirmation }) {
      const { data } = await axios.post('/auth/register', {
        username,
        email,
        password,
        passwordConfirmation,
      });

      this.user = data.user;

      this.setAccessToken(data.accessToken);
    },
    sendEmailVerificationCode() {
      return axios.post('/auth/verify-email/resend', {
        email: this.user.email,
      });
    },
    verifyEmailAddress(code) {
      return axios.post('/auth/verify-email', {
        email: this.user.email,
        code,
      });
    },
    sendPasswordRecoveryEmail(email) {
      return axios.post('/auth/password/forgot', {
        email,
      });
    },
    resetPassword({ email, token, password, passwordConfirmation }) {
      return axios.post('/auth/password/reset', {
        email,
        token,
        password,
        passwordConfirmation,
      });
    },
    async validatePasswordResetToken({ email, token }) {
      const { data } = await axios.post('/auth/password/validate-token', {
        email,
        token,
      });

      return data;
    },
    setAccessToken(accessToken) {
      if (!accessToken) {
        this.accessToken = '';
        Cookies.remove(import.meta.env.VITE_ACCESS_TOKEN_COOKIE);

        return;
      }

      this.accessToken = accessToken;

      Cookies.set(import.meta.env.VITE_ACCESS_TOKEN_COOKIE, accessToken);
    },
  },
});
