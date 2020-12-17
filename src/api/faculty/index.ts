import {IFaculties} from 'types/faculty';
import {IResponse} from 'types/api/response';
import {IRequester, makeRequest} from '@utils/api/axios';
import {withResponseContract} from '@utils/api/with-response-contract';

export const fetchFaculties = async (): Promise<IResponse<IFaculties>> => {
  const fetcher = withResponseContract<IRequester, IFaculties>(makeRequest, []);
  const result = await fetcher('GET', 'faculties', {});
  return result;
};
