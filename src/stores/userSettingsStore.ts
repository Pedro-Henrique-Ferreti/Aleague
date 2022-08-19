import type { State } from '@/types/UserSettingsStore';
import { defineStore } from 'pinia';
import { useAuthStore } from './authStore';
import { useUserStore } from './userStore';

export const useUserSettingsStore = defineStore('userSettings', {
  state: (): State  => {
    return {
      showModal: false,
      profile: {
        selectedAvatar: null,
        username: null,
      },
    };
  },
  getters: {
    profileHasUnsavedChanges(): boolean {
      const { user } = useUserStore();
      const { selectedAvatar, username } = this.profile;

      const selectedAvatarIsUnsaved = !!(selectedAvatar && selectedAvatar !== user?.avatar);
      const usernameIsUnsaved = !!(username && username !== user?.username);

      return selectedAvatarIsUnsaved || usernameIsUnsaved;
    },
  },
  actions: {
    openModal() {
      this.showModal = true;
    },
    resetProfileInfo() {
      this.profile.selectedAvatar = null;
      this.profile.username = null;
    },
    async saveProfileInfo() {
      const { updateUserInfo } = useUserStore();

      await updateUserInfo({
        username: this.profile.username as string,
        avatar: this.profile.selectedAvatar as string,
      });

      const { getAuthenticatedUser } = useAuthStore();

      return getAuthenticatedUser();
    },
  },
});
