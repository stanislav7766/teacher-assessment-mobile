import {DocumentDirPath, readFile, writeFile, fileExists} from '@utils/fs';
import {IWriteFileResponse} from '@utils/fs/types';
import {isAccess, isValidToken} from './hepers';
import {ITokenType, ITokenItem, IGetTokenResponse} from './types';

const ACCESS_TOKEN_PATH = `${DocumentDirPath}/access_token.json`;
const REFRESH_TOKEN_PATH = `${DocumentDirPath}/refresh_token.json`;

export const setToken = (token: ITokenItem, type: ITokenType): Promise<IWriteFileResponse> =>
  writeFile(isAccess(type) ? ACCESS_TOKEN_PATH : REFRESH_TOKEN_PATH, JSON.stringify(token));

export const getToken = async (type: ITokenType): Promise<IGetTokenResponse> => {
  try {
    const path = isAccess(type) ? ACCESS_TOKEN_PATH : REFRESH_TOKEN_PATH;
    const {result: exists} = await fileExists(path);
    !exists && (await setToken('', type));
    const {err, result} = await readFile(path);
    return err ? {err: 'invalid-token', result: null} : {err: null, result: JSON.parse(result as string)};
  } catch (err) {
    return {
      err: err.Message,
      result: null,
    };
  }
};
export const tokenExists = async (type: ITokenType): Promise<boolean> =>
  new Promise(resolve => {
    getToken(type)
      .then(({err, result}) => resolve(!err && isValidToken(result, type)))
      .catch(_err => resolve(false));
  });

export const isTokenExpired = (expDate: number): boolean => {
  const accessTokenExpDate: number = expDate - 10;
  const nowTime = Math.floor(new Date().getTime() / 1000);
  return accessTokenExpDate <= nowTime;
};

export const parseTokenData = (accessToken: string): unknown | null => {
  try {
    const payload = accessToken.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (_err) {
    return null;
  }
};
