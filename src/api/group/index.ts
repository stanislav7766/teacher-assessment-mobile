import {IGroups} from 'types/group';
import {IResponse} from 'types/api/response';
import {IRequester, makeRequest} from '@utils/api/axios';
import {withResponseContract} from '@utils/api/with-response-contract';

export const fetchGroups = async (): Promise<IResponse<IGroups>> => {
  const fetcher = withResponseContract<IRequester, IGroups>(makeRequest, []);
  const result = await fetcher('GET', 'groups', {});
  return result;
};
