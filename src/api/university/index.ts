import {IUniversities} from 'types/university';
import {IResponse} from 'types/api/response';
import {IRequester, makeRequest} from '@utils/api/axios';
import {withResponseContract} from '@utils/api/with-response-contract';

export const fetchUniversities = async (): Promise<IResponse<IUniversities>> => {
  const fetcher = withResponseContract<IRequester, IUniversities>(makeRequest, []);
  const result = await fetcher('GET', 'universities', {});
  return result;
};
