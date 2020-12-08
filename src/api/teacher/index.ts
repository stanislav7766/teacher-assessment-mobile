import {ITeachers} from 'types/teacher';
import {IResponse} from 'types/api/response';
import {defaultTeachers} from './default';

export const fetchTeachers = (): Promise<IResponse<ITeachers>> =>
  new Promise((resolve, _reject) => {
    const payload = {
      err: null,
      data: defaultTeachers,
    };
    setTimeout(() => resolve(payload), 500);
  });
