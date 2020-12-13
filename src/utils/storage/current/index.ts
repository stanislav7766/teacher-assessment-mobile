import {DocumentDirPath, readFile, writeFile, fileExists} from '@utils/fs';
import {IWriteFileResponse} from '@utils/fs/types';
import {ICurrentItem, IGetCurrentResponse, ICurrentType} from './types';
import {isUser, getDefaultCurrent, isValidCurrent, isDefaultCurrent} from './helpers';

const USER_PATH = `${DocumentDirPath}/current-user.json`;
const UNIVERSITY_PATH = `${DocumentDirPath}/current-university.json`;

export const setCurrent = (current: ICurrentItem, type: ICurrentType): Promise<IWriteFileResponse> =>
  writeFile(isUser(type) ? USER_PATH : UNIVERSITY_PATH, JSON.stringify(current));

export const getCurrent = async (type: ICurrentType): Promise<IGetCurrentResponse> => {
  try {
    const path = isUser(type) ? USER_PATH : UNIVERSITY_PATH;
    const {result: exists} = await fileExists(path);
    !exists && (await setCurrent(getDefaultCurrent(type), type));
    const {err, result} = await readFile(path);
    return err ? {err: 'invalid-current', result: null} : {err: null, result: JSON.parse(result as string)};
  } catch (err) {
    return {
      err: err.Message,
      result: null,
    };
  }
};
export const currentExists = async (type: ICurrentType): Promise<boolean> =>
  new Promise(resolve => {
    getCurrent(type)
      .then(({err, result}) => resolve(!err && isValidCurrent(result)))
      .catch(_err => resolve(false));
  });

export const fetchCurrent = async (type: ICurrentType): Promise<[boolean, ICurrentItem | null]> => {
  const exists = await currentExists(type);
  const {result} = await getCurrent(type);
  const isValid = exists && !isDefaultCurrent(result as ICurrentItem, type);
  return [isValid, result];
};
