export type UserSettingsStoreState = {
  showModal: boolean;
  profile: {
    selectedAvatar: string | null;
    username: string | null;
  };
};
