import {authedInstance, axios, AxiosRequestConfig} from '@utils/api/axios';
import {IMethod} from './types';

const createQueryParams = (params: any): string =>
  Object.keys(params)
    .map(k => `${k}=${encodeURI(params[k])}`)
    .join('&');

export const makeRequest = async (method: IMethod, path: string, params: unknown) => {
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
