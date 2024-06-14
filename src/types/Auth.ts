export interface User {
  avatar: string;
  createdAt: string;
  email: string;
  emailVerifiedAt: string;
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
