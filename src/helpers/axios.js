import axios from 'axios';
import Cookies from 'js-cookie';

function handleSuccess(response) {
  return response;
}

function handleError(error) {
  const { data } = error.response;

  if (data.errors) {
    throw new Error(Object.values(data.errors)[0][0]);
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

axiosInstance.interceptors.request.use(function (config) {
  const accessToken = Cookies.get(import.meta.env.VITE_ACCESS_TOKEN_COOKIE);

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(handleSuccess, handleError);

export default axiosInstance;
