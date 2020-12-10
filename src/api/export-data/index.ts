import {IResponse} from 'types/api/response';
import {defaultExportData} from './default';

export const fetchExportData = (): Promise<IResponse<string>> =>
  new Promise((resolve, _reject) => {
    const response = {
      err: null,
      data: defaultExportData,
    };
    setTimeout(() => resolve(response), 500);
  });
