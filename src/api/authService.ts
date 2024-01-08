import type User from '@/types/User';
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  ResetPasswordPayload,
  DeleteUserAccountPayload,
} from '@/types/Auth';
import { axiosInstance } from '@/helpers/axios';

export default class AuthService {
  static getAuthenticatedUser() {
    return axiosInstance.get<User>('/auth/me');
  }

  static login(payload: LoginPayload) {
    return axiosInstance.post<LoginResponse>('/auth/login', {
      email: payload.email,
      password: payload.password,
    });
  }

  static register(payload: RegisterPayload) {
    return axiosInstance.post<LoginResponse>('/auth/register', {
      username: payload.username,
      email: payload.email,
      password: payload.password,
      passwordConfirmation: payload.passwordConfirmation,
    });
  }

  static sendVerificationCodeEmail(email: string) {
    return axiosInstance.post('/auth/verify-email/resend', { email });
  }

  static verifyEmailAddress(payload: { email: string; code: string }) {
    return axiosInstance.post('/auth/verify-email', {
      email: payload.email,
      code: payload.code,
    });
  }

  static sendPasswordRecoveryEmail(email: string) {
    return axiosInstance.post('/auth/password/forgot', { email });
  }

  static resetPassword(payload: ResetPasswordPayload) {
    return axiosInstance.post('/auth/password/reset', {
      email: payload.email,
      token: payload.token,
      password: payload.password,
      passwordConfirmation: payload.passwordConfirmation,
    });
  }

  static validatePasswordResetToken(payload: { email: string; token: string }) {
    return axiosInstance.post<{ isValid: boolean }>('/auth/password/validate-token', {
      email: payload.email,
      token: payload.token,
    });
  }

  static sendDeleteAccountVerificationCode() {
    return axiosInstance.post('/auth/delete-account/send-verification-code');
  }

  static deleteUserAccount(payload: DeleteUserAccountPayload) {
    return axiosInstance.post('/auth/delete-account', {
      reason: payload.reason,
      code: payload.verificationCode,
      comment: payload.commentary,
    });
  }
}
