import axios from 'axios';

function handleSuccess(response) {
  return response;
}

function handleError(error) {
  const { status, data } = error.response;

  if (status >= 500) {
    throw new Error('Ocorreu um erro na comunicação com o servidor. Por favor, tente novamente.');
  }

  throw new Error(Object.values(data.errors)[0][0]);
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(handleSuccess, handleError);

export default axiosInstance;
