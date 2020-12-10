import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';
import {requestPermissionStorage} from '@utils/storage-permissions';
import {ERROR_OCCURRED} from '@constants/errors';

const ENCODING_UTF8 = 'utf8';
const EXT_TXT = '.txt';

const isIos = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

type IFSOutput<Data> = {
  err: string | null;
  data: Data;
};

const Dir = isAndroid ? RNFetchBlob.fs.dirs.DownloadDir : RNFetchBlob.fs.dirs.DocumentDir;

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
