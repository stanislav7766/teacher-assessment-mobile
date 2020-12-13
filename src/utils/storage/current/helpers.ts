import {defaultUser} from '@constants/user';
import {defaultUniversity} from '@constants/university';
import {ICurrentItem, ICurrentType} from './types';

export const isUser = (type: ICurrentType): boolean => type === 'user';
export const getDefaultCurrent = (type: ICurrentType): ICurrentItem => (isUser(type) ? defaultUser : defaultUniversity);

export const isDefaultCurrent = (current: ICurrentItem, type: ICurrentType): boolean =>
  JSON.stringify(current) === JSON.stringify(getDefaultCurrent(type));

export const isValidCurrent = (current: ICurrentItem | null): boolean => current !== null;
