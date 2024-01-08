import type { AxiosResponse } from 'axios';
import type { UpdateUserInfoParams, State } from '@/types/user';
import type User from '@/types/User';
import { defineStore } from 'pinia';
import { axiosInstance } from '@/helpers/axios';

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      user: undefined,
    };
  },
  actions: {
    updateUserInfo({ username, avatar }: UpdateUserInfoParams) {
      return axiosInstance.patch<AxiosResponse<User>>('/auth/me', {
        username: username || this.user?.username,
        avatar: avatar || this.user?.avatar,
      });
    },
  },
});
