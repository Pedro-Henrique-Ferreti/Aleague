export interface State {
  showModal: boolean;
  profile: {
    selectedAvatar: string | undefined;
    username: string | undefined;
  };
}
