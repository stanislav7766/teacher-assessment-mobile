import {IResponse} from 'types/api/response';
import {IInputs} from 'types/common';
import {signOut, signIn} from '@utils/auth';
import {makeRequest, IRequester} from '@utils/api/axios';
import {withResponseContract} from '@utils/api/with-response-contract';
import {defaultUser} from '@constants/user';
import {defaultUniversity} from '@constants/university';
import {IAuth, IAuthResponse} from './types';

const defaultAuthResponse: IAuthResponse = {
  accessToken: '',
  refreshToken: false,
  university: defaultUniversity,
  user: defaultUser,
};

export const fetchSign = async (_inputs: IInputs): Promise<IResponse<IAuth>> => {
  const deviceId = '';
  const fetcher = withResponseContract<IRequester, IAuthResponse>(makeRequest, defaultAuthResponse);
  const {err, data} = await fetcher('POST', 'auth/sign-in', {
    deviceId,
    ..._inputs,
  });
  err
    ? signOut()
    : signIn({
        access: data.accessToken,
        refresh: data.refreshToken,
        user: data.user,
        university: data.university,
      });
  const {user, university} = data;
  return {err, data: {user, university, isAuthenticated: true}};
};
