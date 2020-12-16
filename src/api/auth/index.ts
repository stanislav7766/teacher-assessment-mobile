import {IResponse} from 'types/api/response';
import {ICurrentUser} from 'types/user';
import {ICurrentUniversity} from 'types/university';
import {IInputs} from 'types/common';
import {signOut, signIn} from '@utils/auth';
import {makeRequest} from '@utils/api/axios';
import {defaultUser} from '@constants/user';
import {defaultUniversity} from '@constants/university';
import {ERROR_OCCURRED} from '@constants/errors';

type IAuth = {
  user: ICurrentUser;
  isAuthenticated: boolean;
  university: ICurrentUniversity;
};
export const fetchSign = (_inputs: IInputs): Promise<IResponse<IAuth>> =>
  new Promise((resolve, _reject) => {
    const deviceId = '';
    makeRequest('POST', 'auth/sign-in', {
      deviceId,
      ..._inputs,
    })
      .then(({data}) => {
        const res = {
          err: null,
          data: {
            user: data.user,
            isAuthenticated: true,
            university: data.university,
          },
        };
        signIn({
          refresh: data.refreshToken,
          access: data.accessToken,
          user: data.user,
          university: data.university,
        });
        resolve(res);
      })
      .catch(err => {
        const {message} = err?.response?.data;
        const response = {
          err: message ?? ERROR_OCCURRED,
          data: {
            user: defaultUser,
            isAuthenticated: false,
            university: defaultUniversity,
          },
        };
        signOut();
        resolve(response);
      });
  });
