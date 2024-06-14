import type { AuthPayload, SessionCookie } from '@/types/Auth';
import { axiosInstance } from '@/helpers/axios';

export default class AuthService {
  static authenticate(payload: AuthPayload) {
    return axiosInstance.post<SessionCookie>('/auth/login', {
      email: payload.email,
      password: payload.password,
    });
  }
}
