import {AxiosError, AxiosResponse} from 'axios';
import {ERROR_OCCURRED} from '@constants/errors';
import {HTTP_STATUS_BAD, HTTP_STATUS_NOT_FOUND, HTTP_STATUS_SERVER_ERROR, ECONNABORTED} from './http-status';
import {IContract, IWithArgs} from './types';

const getErrorString = (err: AxiosError): string => {
  const statusCode: number = err.response?.status as number;
  const message: string = err?.response?.data?.message ?? err?.message ?? ERROR_OCCURRED;

  if (HTTP_STATUS_BAD.includes(statusCode)) return message;
  if (HTTP_STATUS_SERVER_ERROR.includes(statusCode)) return ERROR_OCCURRED;
  if (HTTP_STATUS_NOT_FOUND.includes(statusCode)) return ERROR_OCCURRED;
  if (err.code === ECONNABORTED) return ERROR_OCCURRED;
  return ERROR_OCCURRED;
};

export const withResponseContract = <F extends IWithArgs, Data>(requester: F, emptyData: Data) => (
  ...args: Parameters<F>
): Promise<IContract<Data>> =>
  new Promise(resolve => {
    requester(...args).then(
      ({data}: AxiosResponse) => {
        const result: IContract<Data> = {
          err: null,
          data,
        };
        return resolve(result);
      },
      (error: AxiosError) => {
        const result: IContract<Data> = {
          err: getErrorString(error),
          data: emptyData,
        };
        return resolve(result);
      },
    );
  });
