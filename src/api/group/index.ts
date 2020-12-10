import {IGroups} from 'types/group';
import {IResponse} from 'types/api/response';
import {defaultGroups} from './default';

export const fetchGroups = (): Promise<IResponse<IGroups>> =>
  new Promise((resolve, _reject) => {
    const response = {
      err: null,
      data: defaultGroups,
    };
    setTimeout(() => resolve(response), 500);
  });
