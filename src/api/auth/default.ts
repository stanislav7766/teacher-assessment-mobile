import {IAuth} from 'types/auth';
import {IUser} from 'types/user';
import {STUDENT} from '@constants/roles';
import {randomID} from '@utils/random-id';

export const defaultAuth: IAuth = {isAuthenticated: true};

export const defaultUser: IUser = {
  avatar: 'https://strana.ua/img/article/1262/5_main-v1551691292.jpeg',
  username: 'Шемседінов Тімур Гафарович',
  role: STUDENT,
  id: randomID(),
};
