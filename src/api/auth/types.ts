import {ICurrentUniversity} from 'types/university';
import {ICurrentUser} from 'types/user';

export type IAuth = {
  user: ICurrentUser;
  isAuthenticated: boolean;
  university: ICurrentUniversity;
};

export type IAuthResponse = {
  user: ICurrentUser;
  university: ICurrentUniversity;
  accessToken: string;
  refreshToken: boolean;
};
