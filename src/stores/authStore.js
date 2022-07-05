import { defineStore } from 'pinia';
import axios from '@/helpers/axios';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {};
  },
  actions: {
    async login({ email, password }) {
      const response = await axios.post('/auth/login', {
        email,
        password,
      });

      console.log(response);
    },
  },
});
