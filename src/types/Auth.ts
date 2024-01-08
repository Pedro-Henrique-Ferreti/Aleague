export interface User {
  id: string,
  username: string,
  email: string,
  emailVerifiedAt: string | null,
  avatar: string,
  createdAt: string,
  updatedAt: string,
}

// Store types
export interface StoreState {
  showSplashScreen: boolean,
  accessToken: string | null,
  user: User | null,
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