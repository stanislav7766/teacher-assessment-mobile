import {IResponse} from 'types/api/response';
import {IUser} from 'types/user';
import {IInputs} from 'types/common';
import {defaultAuth, defaultUser} from './default';

type IAuth = {
  user: IUser;
  isAuthenticated: boolean;
};
export const fetchSign = (_inputs: IInputs): Promise<IResponse<IAuth>> =>
  new Promise((resolve, _reject) => {
    const payload = {
      err: null,
      data: {
        user: defaultUser,
        isAuthenticated: defaultAuth.isAuthenticated,
      },
    };
    setTimeout(() => resolve(payload), 500);
  });
