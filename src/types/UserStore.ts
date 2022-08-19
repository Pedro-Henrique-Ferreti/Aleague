import type User from './User';

export interface State {
  user: User | undefined,
}

export interface UpdateUserInfoParams {
  username?: string;
  avatar?: string;
}
