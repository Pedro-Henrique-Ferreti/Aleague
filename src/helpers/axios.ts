import type { SessionCookie } from '@/types/Auth';
import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const cookie: SessionCookie | null = JSON.parse(
    Cookies.get(import.meta.env.VITE_SESSION_COOKIE) || 'null',
  );

  if (cookie?.accessToken && config.headers) {
    config.headers['Authorization'] = `Bearer ${cookie.accessToken}`; // eslint-disable-line
  }

  return config;
});
