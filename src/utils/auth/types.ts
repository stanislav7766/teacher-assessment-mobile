import {ICurrentUniversity} from 'types/university';
import {ICurrentUser} from 'types/user';

export declare interface ISignInParams {
  onSignIn?: () => void;
  access: string;
  refresh: boolean;
  user: ICurrentUser;
  university: ICurrentUniversity;
}
export declare interface ISignOutParams {
  onSignOut?: () => void;
}
