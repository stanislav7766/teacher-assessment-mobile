import {IAuth} from 'types/auth';
import {IUser} from 'types/user';
import {TEACHER} from '@constants/roles';

export const defaultAuth: IAuth = {isAuthenticated: true};

export const defaultUser: IUser = {
  rating: 4.6,
  avatar: 'https://strana.ua/img/article/1262/5_main-v1551691292.jpeg',
  username: 'Шемседінов Тімур Гафарович',
  role: TEACHER,
};
