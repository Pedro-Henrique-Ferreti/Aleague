import { defineStore } from 'pinia';
import type { UserStoreState } from '@/types/UserStore';

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => {
    return {
      user: undefined,
    };
  },
});
