import type { AxiosResponse } from 'axios';

export type ValueOf<T> = T[keyof T];

export type ApiError = AxiosResponse<{
  message: string;
  errors: { [key: string]: string[] };
}>;

export interface User {
  avatar: string;
  createdAt: string;
  email: string;
  emailVerifiedAt: string | null;
  id: string;
  lastLoginAt: string;
  updatedAt: string;
  username: string; 
}

export interface SessionCookie {
  user: User;
  accessToken: string;
}

// Store types
export interface AuthStoreState {
  user: User | null;
  accessToken: string | null;
}

export interface AuthPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
