import {ILocalAdmins} from 'types/local-admin';
import {IResponse} from 'types/api/response';
import {IFetchAddLocalAdminPayload, IFetchDeleteLocalAdminPayload} from './types';
import {defaultLocalAdmins} from './default';

export const fetchLocalAdmins = (): Promise<IResponse<ILocalAdmins>> =>
  new Promise((resolve, _reject) => {
    const response = {
      err: null,
      data: defaultLocalAdmins,
    };
    setTimeout(() => resolve(response), 500);
  });

export const fetchAddLocalAdmin = (payload: IFetchAddLocalAdminPayload): Promise<IResponse<boolean>> =>
  new Promise((resolve, _reject) => {
    const response = {
      err: null,
      data: true,
    };
    setTimeout(() => resolve(response), 500);
  });

export const fetchDeleteLocalAdmin = (payload: IFetchDeleteLocalAdminPayload): Promise<IResponse<boolean>> =>
  new Promise((resolve, _reject) => {
    const response = {
      err: null,
      data: true,
    };
    setTimeout(() => resolve(response), 500);
  });
