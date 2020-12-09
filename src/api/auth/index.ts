import {IResponse} from 'types/api/response';
import {IUser} from 'types/user';
import {IUniversity} from 'types/university';
import {IInputs} from 'types/common';
import {defaultAuth, defaultUser, defaultUniversity} from './default';

type IAuth = {
  user: IUser;
  isAuthenticated: boolean;
  university: IUniversity;
};
export const fetchSign = (_inputs: IInputs): Promise<IResponse<IAuth>> =>
  new Promise((resolve, _reject) => {
    const payload = {
      err: null,
      data: {
        user: defaultUser,
        isAuthenticated: defaultAuth.isAuthenticated,
        university: defaultUniversity,
      },
    };
    setTimeout(() => resolve(payload), 500);
  });
