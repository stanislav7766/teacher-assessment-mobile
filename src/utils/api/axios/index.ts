import axios, {AxiosRequestConfig, AxiosError, AxiosResponse} from 'axios';
import {config} from '@config/api';
import {tokenExists, getToken, setToken, isTokenExpired, parseTokenData} from '@utils/storage/tokens';
import {IMethod} from './types';

const createQueryParams = (params: any): string =>
  Object.keys(params)
    .map(k => `${k}=${encodeURI(params[k])}`)
    .join('&');

const authedInstance = axios.create(config);
// const instance = axios.create(config);
export type IRequester = (method: IMethod, url: string, params: any) => Promise<AxiosResponse>;

export const makeRequest: IRequester = async (method: IMethod, path: string, params: unknown) => {
  const source = axios.CancelToken.source();
  const opts: AxiosRequestConfig = {
    method,
    cancelToken: source.token,
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const needParams = ['GET', 'OPTIONS'].includes(method);
  const url = needParams ? path + (path.indexOf('?') === -1 ? '?' : '&') + createQueryParams(params) : path;
  const options = needParams ? {...opts, url} : {...opts, url, data: params};
  const response = authedInstance(options);

  return response;
};

// check token expire, refresh-tokens, catch errors need
authedInstance.interceptors.request.use(
  async request => {
    const accessExists = await tokenExists('access');
    const refreshExists = await tokenExists('refresh');
    const {result: accessToken} = await getToken('access');
    const toksExists = accessExists && refreshExists;
    request.headers.Authorization = toksExists ? accessToken : '';
    // @ts-ignore
    if (toksExists && isTokenExpired(parseTokenData(accessToken).exp) && refreshExists) {
      return makeRequest('POST', '/auth/refresh-tokens', {})
        .then(async (response: AxiosResponse) => {
          await setToken(response.data.accessToken, 'access');
          request.headers.Authorization = response.data.accessToken;
          return request;
        })
        .catch((error: AxiosError) => Promise.reject(error));
    }
    return request;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export {axios, AxiosRequestConfig};
