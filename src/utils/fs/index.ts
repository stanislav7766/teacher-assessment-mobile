import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';
import {requestPermissionStorage} from '@utils/storage-permissions';
import {ERROR_OCCURRED} from '@constants/errors';
import {IFileExistsResponse, IReadFileResponse, IWriteFileResponse} from './types';

const ENCODING_UTF8 = 'utf8';
type IEncoding = 'utf8' | 'ascii' | 'base64';
const EXT_TXT = '.txt';

const isIos = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

type IFSOutput<Data> = {
  err: string | null;
  data: Data;
};

const Dir = isAndroid ? RNFetchBlob.fs.dirs.DownloadDir : RNFetchBlob.fs.dirs.DocumentDir;

export const {DocumentDir: DocumentDirPath} = RNFetchBlob.fs.dirs;

const createFileName = (prefix: string): string => {
  const date = new Date();
  const ddmmyyyy = date.toLocaleDateString('ua-ua').split('/').join('-');
  const ms = date.getMilliseconds();
  return `${prefix} ${ddmmyyyy} ${ms}`;
};

export const downloadFile = async (data: string, prefix: string): Promise<IFSOutput<boolean>> => {
  try {
    if (isAndroid && !(await requestPermissionStorage())) {
      return {
        err: `Перевірте дозвіл на використання пам'яті`,
        data: false,
      };
    }
    const fileName = `${createFileName(prefix)}${EXT_TXT}`;
    const path = `${Dir}/${fileName}`;

    await RNFetchBlob.fs.writeFile(path, data, ENCODING_UTF8);
    isIos && RNFetchBlob.ios.previewDocument(path);
    isAndroid &&
      (await RNFetchBlob.android.addCompleteDownload({
        title: fileName,
        description: 'Download complete',
        mime: 'application/txt',
        path,
        showNotification: true,
      }));
    return {
      err: null,
      data: true,
    };
  } catch (_err) {
    return {
      data: false,
      err: ERROR_OCCURRED,
    };
  }
};

export const writeFile = (path: string, data: string, encoding?: IEncoding): Promise<IWriteFileResponse> =>
  new Promise(resolve => {
    RNFetchBlob.fs
      .writeFile(path, data, encoding ?? ENCODING_UTF8)
      .then(() => resolve({err: null, result: true}))
      .catch(err => resolve({err: err.Message, result: false}));
  });

export const readFile = (path: string, encoding?: IEncoding): Promise<IReadFileResponse> =>
  new Promise(resolve => {
    RNFetchBlob.fs
      .readFile(path, encoding ?? ENCODING_UTF8)
      .then(content => resolve({err: null, result: content}))
      .catch(err => resolve({err: err.Message, result: null}));
  });

export const fileExists = (path: string): Promise<IFileExistsResponse> =>
  new Promise(resolve => {
    RNFetchBlob.fs
      .exists(path)
      .then(exists => resolve({err: null, result: exists}))
      .catch(err => resolve({err: err.Message, result: false}));
  });
