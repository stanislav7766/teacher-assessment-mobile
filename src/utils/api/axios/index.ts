import axios, {AxiosRequestConfig} from 'axios';
import {config} from '@config/api';

export const authedInstance = axios.create(config);
export const instance = axios.create(config);
// check token expire, refresh-tokens, catch errors need
authedInstance.interceptors.request.use(
  request => {
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

export {axios, AxiosRequestConfig};
