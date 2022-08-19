import type { UpdateUserInfoParams, State } from '@/types/UserStore';
import { defineStore } from 'pinia';
import axios from '@/helpers/axios';

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      user: undefined,
    };
  },
  actions: {
    updateUserInfo({ username, avatar }: UpdateUserInfoParams) {
      return axios.patch('/auth/me', {
        username: username || this.user?.username,
        avatar: avatar || this.user?.avatar,
      });
    },
  },
});
