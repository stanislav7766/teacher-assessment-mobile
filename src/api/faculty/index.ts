import {IFaculties} from 'types/faculty';
import {IResponse} from 'types/api/response';
import {makeRequest} from '@utils/api/axios';
import {ERROR_OCCURRED} from '@constants/errors';

export const fetchFaculties = (): Promise<IResponse<IFaculties>> =>
  new Promise((resolve, _reject) => {
    makeRequest('GET', 'faculties', {})
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
