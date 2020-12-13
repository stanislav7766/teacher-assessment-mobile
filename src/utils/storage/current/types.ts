import {ICurrentUser} from 'types/user';
import {ICurrentUniversity} from 'types/university';

export {ICurrentUser, ICurrentUniversity};
export type ICurrentType = 'university' | 'user';
export type ICurrentItem = ICurrentUniversity | ICurrentUser;

export type IGetCurrentResponse = {
  err: string | null;
  result: ICurrentItem | null;
};
