export interface AuthStoreState {
  showSplashScreen: boolean,
  accessToken: string | null,
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