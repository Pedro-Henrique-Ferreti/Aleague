import type User from './User';

export interface UserStoreState {
  user: User | undefined,
}

export interface updateUserInfoProps {
  username?: string;
  avatar?: string;
}
