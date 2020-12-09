import {IAuth} from 'types/auth';
import {IUser} from 'types/user';
import {ADMIN} from '@constants/roles';
import {randomID} from '@utils/random-id';
import {IUniversity} from 'types/university';

export const defaultAuth: IAuth = {isAuthenticated: true};

export const defaultUser: IUser = {
  avatar: 'https://strana.ua/img/article/1262/5_main-v1551691292.jpeg',
  username: 'Шемседінов Тімур Гафарович',
  role: ADMIN,
  id: randomID(),
};

export const defaultUniversity: IUniversity = {
  rating: 4.6,
  preview: 'https://strana.ua/img/article/1262/5_main-v1551691292.jpeg',
  name: 'Национальный медицинский университет имени А. А. Богомольца',
  id: randomID(),
};
