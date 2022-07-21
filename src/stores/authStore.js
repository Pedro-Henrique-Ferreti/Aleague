import { defineStore } from 'pinia';
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

      this.accessToken = data.accessToken;
      this.user = data.user;
    },
    async register({ username, email, password, passwordConfirmation }) {
      const { data } = await axios.post('/auth/register', {
        username,
        email,
        password,
        passwordConfirmation,
      });

      this.accessToken = data.accessToken;
      this.user = data.user;
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
      return axios.post('/auth/forgot-password', {
        email,
      });
    },
  },
});
