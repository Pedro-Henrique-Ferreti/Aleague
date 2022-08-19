import type User from './User';

export interface UserStoreState {
  user: User | {
    id: null,
    username: null,
    email: null,
    emailVerifiedAt: null,
    avatar: null,
    createdAt: null,
    updatedAt: null,
  },
}
