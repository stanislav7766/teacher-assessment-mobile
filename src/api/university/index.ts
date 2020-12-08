import {IUniversities} from 'types/university';
import {IResponse} from 'types/api/response';
import {defaultUniversities} from './default';

export const fetchUniversities = (): Promise<IResponse<IUniversities>> =>
  new Promise((resolve, _reject) => {
    const payload = {
      err: null,
      data: defaultUniversities,
    };
    setTimeout(() => resolve(payload), 500);
  });
