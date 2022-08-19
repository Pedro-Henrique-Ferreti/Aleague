export interface State {
  showSplashScreen: boolean,
  accessToken: string | null,
}

export interface LoginParams {
  email: string,
  password: string,
}

export interface RegisterParams {
  username: string,
  email: string,
  password: string,
  passwordConfirmation: string,
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