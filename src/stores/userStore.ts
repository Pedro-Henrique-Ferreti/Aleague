import { defineStore } from 'pinia';
import type { UserStoreState } from '@/types/UserStore';

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => {
    return {
      showUserSettingsModal: false,
    };
  },
  actions: {
    openUserSettingsModal() {
      this.showUserSettingsModal = true;
    },
  },
});
