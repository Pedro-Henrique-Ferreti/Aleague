import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import router from '@/router';

function handleSuccess(response: AxiosResponse) {
  return response;
}

function handleError(error: AxiosError) {
  if (error.response?.status === 404) {
    router.push({
      name: 'not-found',
      params: { pathMatch: window.location.pathname.substring(1).split('/') },
    });
    return;
  }

  const { data } = error.response as AxiosResponse;

  if (data.errors) {
    throw new Error(Object.values<string[]>(data.errors)[0][0]);
  }

  if (data.message) {
    throw new Error(data.message);
  }

  throw new Error('Ocorreu um erro na comunicação com o servidor. Por favor, tente novamente.');
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Locale': 'pt_BR',
  },
});

axiosInstance.interceptors.request.use(function (config: AxiosRequestConfig) {
  const accessToken = Cookies.get(import.meta.env.VITE_ACCESS_TOKEN_COOKIE);

  if (accessToken && config.headers) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(handleSuccess, handleError);

export default axiosInstance;
