import { defineStore } from 'pinia';
import api from '@/api';
import { useAuthStore } from './auth';

interface State {
  showModal: boolean;
  profile: {
    selectedAvatar: string | undefined;
    username: string | undefined;
  };
}

export const useUserSettingsStore = defineStore('userSettings', {
  state: (): State  => {
    return {
      showModal: false,
      profile: {
        selectedAvatar: undefined,
        username: undefined,
      },
    };
  },
  getters: {
    profileHasUnsavedChanges(): boolean {
      const { user } = useAuthStore();
      const { selectedAvatar, username } = this.profile;

      const selectedAvatarIsUnsaved = !!(selectedAvatar && selectedAvatar !== user?.avatar);
      const usernameIsUnsaved = !!(username && username !== user?.username);

      return selectedAvatarIsUnsaved || usernameIsUnsaved;
    },
  },
  actions: {
    openModal() {
      this.setProfileInfo();

      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    setProfileInfo() {
      const { user } = useAuthStore();

      this.profile.selectedAvatar = user?.avatar;
      this.profile.username = user?.username;
    },
    async saveProfileInfo() {
      const { user } = useAuthStore();

      if (!user) return;

      await api.authService.updateUserInfo({
        username: this.profile.username || user.username,
        avatar: this.profile.selectedAvatar || user.avatar,
      });

      const { getAuthenticatedUser } = useAuthStore();

      return getAuthenticatedUser();
    },
  },
});
