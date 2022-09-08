import { defineStore } from 'pinia';
import { useAuthStore } from './authStore';
import { useUserStore } from './userStore';

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
      const { user } = useUserStore();
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
      const { user } = useUserStore();

      this.profile.selectedAvatar = user?.avatar;
      this.profile.username = user?.username;
    },
    async saveProfileInfo() {
      const { updateUserInfo } = useUserStore();

      await updateUserInfo({
        username: this.profile.username,
        avatar: this.profile.selectedAvatar,
      });

      const { getAuthenticatedUser } = useAuthStore();

      return getAuthenticatedUser();
    },
  },
});
