import type { AxiosResponse } from 'axios';
import type {
  State,
  LoginParams,
  RegisterParams,
  ResetPasswordParams,
  ValidatePasswordResetTokenParams,
  LoginResponse,
  RegisterResponse,
  ValidatePasswordResetTokenResponse,
  DeleteUserAccountParams,
} from '@/types/AuthStore';
import type User from '@/types/User';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { axiosInstance } from '@/helpers/axios';
import { useUserStore } from './user';

export const useAuthStore = defineStore('auth', {
  state: (): State => {
    return {
      showSplashScreen: Boolean(Cookies.get(import.meta.env.VITE_ACCESS_TOKEN_COOKIE)),
      accessToken: null,
    };
  },
  getters: {
    userIsAuthenticated(state) {
      const userStore = useUserStore();

      return !!(state.accessToken && userStore.user);
    },
  },
  actions: {
    async login({ email, password }: LoginParams) {
      const userStore = useUserStore();

      const { data }: AxiosResponse<LoginResponse> = await axiosInstance.post('/auth/login', {
        email,
        password,
      });

      userStore.user = data.user;

      this.setAccessToken(data.accessToken);
    },
    logout() {
      this.setAccessToken();
    },
    async register({ username, email, password, passwordConfirmation }: RegisterParams) {
      const userStore = useUserStore();

      const { data }: AxiosResponse<RegisterResponse> = await axiosInstance.post('/auth/register', {
        username,
        email,
        password,
        passwordConfirmation,
      });

      userStore.user = data.user;

      this.setAccessToken(data.accessToken);
    },
    sendEmailVerificationCode() {
      const { user } = useUserStore();

      return axiosInstance.post('/auth/verify-email/resend', {
        email: user?.email,
      });
    },
    verifyEmailAddress(code: string) {
      const { user } = useUserStore();

      return axiosInstance.post('/auth/verify-email', {
        email: user?.email,
        code,
      });
    },
    sendPasswordRecoveryEmail(email: string) {
      return axiosInstance.post('/auth/password/forgot', {
        email,
      });
    },
    resetPassword({ email, token, password, passwordConfirmation }: ResetPasswordParams) {
      return axiosInstance.post('/auth/password/reset', {
        email,
        token,
        password,
        passwordConfirmation,
      });
    },
    async validatePasswordResetToken({ email, token }: ValidatePasswordResetTokenParams) {
      const { data }: AxiosResponse<ValidatePasswordResetTokenResponse> = await axiosInstance.post('/auth/password/validate-token', {
        email,
        token,
      });

      return data;
    },
    async getAuthenticatedUser() {
      const userStore = useUserStore();

      const { data: user }: AxiosResponse<User> = await axiosInstance.get('/auth/me');

      userStore.user = user;
    },
    setAccessToken(accessToken?: string) {
      if (!accessToken) {
        this.accessToken = '';

        Cookies.remove(import.meta.env.VITE_ACCESS_TOKEN_COOKIE);

        return;
      }

      this.accessToken = accessToken;

      Cookies.set(import.meta.env.VITE_ACCESS_TOKEN_COOKIE, accessToken);
    },
    async reloadUser() {
      this.showSplashScreen = true;

      try {
        await this.getAuthenticatedUser();
        this.setAccessToken(Cookies.get(import.meta.env.VITE_ACCESS_TOKEN_COOKIE));
      } catch (error) {
        this.setAccessToken();
      } finally {
        this.showSplashScreen = false;
      }
    },
    sendDeleteAccountVerificationCode() {
      return axiosInstance.post('/auth/delete-account/send-verification-code');
    },
    deleteUserAccount({ verificationCode, reason, commentary }: DeleteUserAccountParams) {
      return axiosInstance.post('/auth/delete-account', {
        reason,
        code: verificationCode,
        comment: commentary,
      });
    },
  },
});
