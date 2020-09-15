import axios, { AxiosError } from 'axios';
import { notification } from 'antd';

axios.defaults.baseURL = process.env.REACT_APP_API_REST_URL;

axios.interceptors.response.use(undefined, (error: AxiosError) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // log error
    notification.error({
      message: 'Unexpected Error',
      description: error.message,
    });
  }

  return Promise.reject(error);
});

const setJwt = (jwt: string): void => {
  axios.defaults.headers.Authorization = jwt;
};

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt,
};
