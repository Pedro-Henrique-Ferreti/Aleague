import type {
  AuthPayload, RegisterPayload, SessionCookie,
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
}
