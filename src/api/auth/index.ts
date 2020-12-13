import {IResponse} from 'types/api/response';
import {ICurrentUser} from 'types/user';
import {ICurrentUniversity} from 'types/university';
import {IInputs} from 'types/common';
import {defaultAuth, defaultUser, defaultUniversity} from './default';

type IAuth = {
  user: ICurrentUser;
  isAuthenticated: boolean;
  university: ICurrentUniversity;
};
export const fetchSign = (_inputs: IInputs): Promise<IResponse<IAuth>> =>
  new Promise((resolve, _reject) => {
    const deviceId = '';
    const response = {
      err: null,
      data: {
        user: defaultUser,
        isAuthenticated: defaultAuth.isAuthenticated,
        university: defaultUniversity,
      },
    };
    setTimeout(() => resolve(response), 500);
  });
