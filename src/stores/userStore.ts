import { defineStore } from 'pinia';
import type { UserStoreState } from '@/types/UserStore';

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => {
    return {
      user: {
        id: null,
        username: null,
        email: null,
        emailVerifiedAt: null,
        avatar: null,
        createdAt: null,
        updatedAt: null,
      },
    };
  },
});
