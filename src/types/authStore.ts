import type User from './User';

export interface AuthStoreState {
  showSplashScreen: boolean,
  accessToken: string | null,
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

export interface LoginProps {
  email: string,
  password: string,
}

export interface RegisterProps {
  username: string,
  email: string,
  password: string,
  passwordConfirmation: string,
}

export interface ResetPasswordProps {
  email: string,
  token: string,
  password: string,
  passwordConfirmation: string,
}

export interface ValidatePasswordResetTokenProps {
  email: string,
  token: string,
}