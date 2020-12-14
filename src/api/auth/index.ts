import {IResponse} from 'types/api/response';
import {ICurrentUser} from 'types/user';
import {ICurrentUniversity} from 'types/university';
import {IInputs} from 'types/common';
import {signOut, signIn} from '@utils/auth';
import {makeRequest} from '@utils/api/make-request';
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

    makeRequest('POST', 'auth/sign-in', {
      deviceId,
      ..._inputs,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    response.err
      ? signOut()
      : signIn({
          refresh: true,
          access: 'vfvrfsv',
          user: response.data.user,
          university: response.data.university,
        });

    setTimeout(() => resolve(response), 500);
  });
