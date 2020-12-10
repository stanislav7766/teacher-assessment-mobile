import {PermissionsAndroid} from 'react-native';

export const requestPermissionStorage = () =>
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
    title: `Дозвіл на використання пам'яті`,
    message: `Додатку потрібен дозвіл на використання пам'яті`,
    buttonNeutral: 'Спитати пізніше',
    buttonNegative: 'Ні',
    buttonPositive: 'Дозволити',
  })
    .then(res => res === PermissionsAndroid.RESULTS.GRANTED)
    .catch(_err => false);
