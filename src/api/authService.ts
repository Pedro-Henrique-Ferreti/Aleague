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
}
