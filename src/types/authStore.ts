import type User from './User';

export interface State {
  showSplashScreen: boolean,
  accessToken: string | null,
}

export interface LoginParams {
  email: string,
  password: string,
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export interface RegisterParams {
  username: string,
  email: string,
  password: string,
  passwordConfirmation: string,
}

export interface RegisterResponse {
  user: User;
  accessToken: string;
}

export interface ResetPasswordParams {
  email: string,
  token: string,
  password: string,
  passwordConfirmation: string,
}

export interface ValidatePasswordResetTokenParams {
  email: string,
  token: string,
}

export interface ValidatePasswordResetTokenResponse {
  isValid: boolean;
}

export interface DeleteUserAccountParams {
  verificationCode: string;
  reason: string;
  commentary: string;
}