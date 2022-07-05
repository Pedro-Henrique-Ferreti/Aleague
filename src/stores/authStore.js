import { defineStore } from 'pinia';
import axios from '@/helpers/axios';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {};
  },
  actions: {
    async login({ email, password }) {
      const { data } = await axios.post('/auth/login', {
        email,
        password,
      });

      console.log(data);
    },
  },
});
