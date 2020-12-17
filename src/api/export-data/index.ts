import {IResponse} from 'types/api/response';
import {makeRequest, IRequester} from '@utils/api/axios';
import {withResponseContract} from '@utils/api/with-response-contract';

export const fetchExportData = async (): Promise<IResponse<string>> => {
  const fetcher = withResponseContract<IRequester, string>(makeRequest, '');
  const result = await fetcher('GET', 'export-data', {});
  return result;
};
