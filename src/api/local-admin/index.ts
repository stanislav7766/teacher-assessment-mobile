import {ILocalAdmins} from 'types/local-admin';
import {IResponse} from 'types/api/response';
import {makeRequest} from '@utils/api/axios';
import {ERROR_OCCURRED} from '@constants/errors';
import {IFetchAddLocalAdminPayload, IFetchDeleteLocalAdminPayload} from './types';

export const fetchLocalAdmins = (): Promise<IResponse<ILocalAdmins>> =>
  new Promise((resolve, _reject) => {
    makeRequest('GET', 'local-admins', {})
      .then(({data}) => {
        const res = {
          err: null,
          data,
        };
        resolve(res);
      })
      .catch(err => {
        const message = err?.response?.data?.message ?? err?.message;
        const response = {
          err: message ?? ERROR_OCCURRED,
          data: [],
        };
        resolve(response);
      });
  });

export const fetchAddLocalAdmin = (payload: IFetchAddLocalAdminPayload): Promise<IResponse<boolean>> =>
  new Promise((resolve, _reject) => {
    makeRequest('POST', 'local-admins/add', payload)
      .then(({data}) => {
        const res = {
          err: null,
          data,
        };
        resolve(res);
      })
      .catch(err => {
        const message = err?.response?.data?.message ?? err?.message;
        const response = {
          err: message ?? ERROR_OCCURRED,
          data: false,
        };
        resolve(response);
      });
  });

export const fetchDeleteLocalAdmin = (payload: IFetchDeleteLocalAdminPayload): Promise<IResponse<boolean>> =>
  new Promise((resolve, _reject) => {
    makeRequest('POST', 'local-admins/delete', payload)
      .then(({data}) => {
        const res = {
          err: null,
          data,
        };
        resolve(res);
      })
      .catch(err => {
        const message = err?.response?.data?.message ?? err?.message;
        const response = {
          err: message ?? ERROR_OCCURRED,
          data: false,
        };
        resolve(response);
      });
  });
