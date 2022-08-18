import { defineStore } from 'pinia';
import type { UserStoreState } from '@/types/UserStore';

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => {
    return {
      showUserSettingsModal: false,
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
  actions: {
    openUserSettingsModal() {
      this.showUserSettingsModal = true;
    },
  },
});
