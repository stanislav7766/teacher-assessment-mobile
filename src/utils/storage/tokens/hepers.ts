import {ITokenItem, ITokenType} from './types';

const refreshTokenValue: boolean = true;

export const isAccess = (type: ITokenType): boolean => type === 'access';

export const isValidToken = (token: ITokenItem | null, type: ITokenType): boolean =>
  token !== null && (isAccess(type) ? token !== '' : (token as boolean) === refreshTokenValue);

export const getDefaultToken = (type: ITokenType): ITokenItem => (isAccess(type) ? '' : false);
