import { BASE_URL } from '@/configs';
import Axios, { AxiosError } from 'axios';

const axios = Axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const setupInterceptor = ({
  getUserData
}: {
  getUserData: Function;
}) => {
  axios.interceptors.request.use(
    (config) => {
      const userData = getUserData();

      if (userData?.accessToken) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${userData.accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (config) => {
      return config;
    },
    (error) => {
      if (error instanceof AxiosError) {
        const responseData = error?.response?.data.data;
        const newError = { ...error, responseData };
        return Promise.reject(newError);
      }

      return Promise.reject(error);
    }
  );
};

export default axios;
