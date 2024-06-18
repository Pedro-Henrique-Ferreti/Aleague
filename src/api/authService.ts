import type {
  AuthPayload, RegisterPayload, SessionCookie, User,
} from '@/types/Auth';
import { axiosInstance } from '@/helpers/axios';

export default class AuthService {
  static authenticate(payload: AuthPayload) {
    return axiosInstance.post<SessionCookie>('/auth/login', {
      email: payload.email,
      password: payload.password,
    });
  }

  static register(payload: RegisterPayload) {
    return axiosInstance.post<SessionCookie>('/auth/register', {
      username: payload.username,
      email: payload.email,
      password: payload.password,
      passwordConfirmation: payload.password,
    });
  }

  static resendVerificationEmail() {
    return axiosInstance.post('/auth/verify-email/resend');
  }

  static verifyEmailAddress(code: string) {
    return axiosInstance.post<User>('/auth/verify-email', { code });
  }

  static sendResetPasswordEmail(email: string) {
    return axiosInstance.post('/auth/password/forgot', { email });
  }

  static validateResetPasswordToken(payload: { token: string; email: string }) {
    return axiosInstance.post<{ isValid: boolean }>('/auth/password/validate-reset-token', {
      token: payload.token,
      email: payload.email,
    });
  }

  static resetPassword(payload: {
    token: string; email: string; password: string; passwordConfirmation: string;
  }) {
    return axiosInstance.post('/auth/password/reset', {
      token: payload.token,
      email: payload.email,
      password: payload.password,
      passwordConfirmation: payload.passwordConfirmation,
    });
  }
}
