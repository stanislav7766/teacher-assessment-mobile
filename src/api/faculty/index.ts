import {IFaculties} from 'types/faculty';
import {IResponse} from 'types/api/response';
import {defaultFaculties} from './default';

export const fetchFaculties = (): Promise<IResponse<IFaculties>> =>
  new Promise((resolve, _reject) => {
    const response = {
      err: null,
      data: defaultFaculties,
    };
    setTimeout(() => resolve(response), 500);
  });
