import type { UserSettingsStoreState } from '@/types/UserSettingsStore';
import { defineStore } from 'pinia';

export const useUserSettingsStore = defineStore('userSettings', {
  state: (): UserSettingsStoreState  => {
    return {
      showModal: false,
    };
  },
  actions: {
    openModal() {
      this.showModal = true;
    },
  },
});
