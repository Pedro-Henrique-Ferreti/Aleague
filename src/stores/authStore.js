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
  },
});
