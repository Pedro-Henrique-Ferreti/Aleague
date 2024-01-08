import type User from './User';

// Store types
export interface StoreState {
  showSplashScreen: boolean,
  accessToken: string | null,
}

// API types
export interface LoginPayload {
  email: string,
  password: string,
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export interface RegisterPayload {
  username: string,
  email: string,
  password: string,
  passwordConfirmation: string,
}

export interface ResetPasswordPayload {
  email: string,
  token: string,
  password: string,
  passwordConfirmation: string,
}

export interface DeleteUserAccountPayload {
  verificationCode: string;
  reason: string;
  commentary: string;
}