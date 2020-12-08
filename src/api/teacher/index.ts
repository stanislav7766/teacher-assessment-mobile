import {ITeachers} from 'types/teacher';
import {IResponse} from 'types/api/response';
import {defaultTeachers} from './default';
import {IFetchTeachersPayload} from './types';

export const fetchTeachers = (payload: IFetchTeachersPayload): Promise<IResponse<ITeachers>> =>
  new Promise((resolve, _reject) => {
    const response = {
      err: null,
      data: defaultTeachers,
    };
    setTimeout(() => resolve(response), 500);
  });
