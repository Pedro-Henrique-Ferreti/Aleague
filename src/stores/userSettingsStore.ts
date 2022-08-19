import type { UserSettingsState } from '@/types/UserSettings';
import { defineStore } from 'pinia';

export const useUserSettingsStore = defineStore('userSettings', {
  state: (): UserSettingsState  => {
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
