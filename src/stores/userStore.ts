import type { updateUserInfoProps, UserStoreState } from '@/types/UserStore';
import { defineStore } from 'pinia';
import axios from '@/helpers/axios';

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => {
    return {
      user: undefined,
    };
  },
  actions: {
    updateUserInfo({ username, avatar }: updateUserInfoProps) {
      return axios.patch('/auth/me', {
        username: username || this.user?.username,
        avatar: avatar || this.user?.avatar,
      });
    },
  },
});
