import {ILocalAdmins} from 'types/local-admin';
import {IResponse} from 'types/api/response';
import {IRequester, makeRequest} from '@utils/api/axios';
import {withResponseContract} from '@utils/api/with-response-contract';
import {IFetchAddLocalAdminPayload, IFetchDeleteLocalAdminPayload} from './types';

export const fetchLocalAdmins = async (): Promise<IResponse<ILocalAdmins>> => {
  const fetcher = withResponseContract<IRequester, ILocalAdmins>(makeRequest, []);
  const result = await fetcher('GET', 'local-admins', {});
  return result;
};

export const fetchAddLocalAdmin = async (payload: IFetchAddLocalAdminPayload): Promise<IResponse<boolean>> => {
  const fetcher = withResponseContract<IRequester, boolean>(makeRequest, false);
  const result = await fetcher('POST', 'local-admins/add', payload);
  return result;
};

export const fetchDeleteLocalAdmin = async (payload: IFetchDeleteLocalAdminPayload): Promise<IResponse<boolean>> => {
  const fetcher = withResponseContract<IRequester, boolean>(makeRequest, false);
  const result = await fetcher('POST', 'local-admins/delete', payload);
  return result;
};
