import {IFaculties} from 'types/faculty';
import {IResponse} from 'types/api/response';
import {defaultFaculties} from './default';
import {IFetchFacultiesPayload} from './types';

export const fetchFaculties = (payload: IFetchFacultiesPayload): Promise<IResponse<IFaculties>> =>
  new Promise((resolve, _reject) => {
    const response = {
      err: null,
      data: defaultFaculties,
    };
    setTimeout(() => resolve(response), 500);
  });
