import {randomID} from '@utils/random-id';
import {ILocalAdmins} from 'types/local-admin';

export const defaultLocalAdmins: ILocalAdmins = [
  {
    rating: 4.6,
    avatar: 'https://strana.ua/img/article/1262/5_main-v1551691292.jpeg',
    username: 'Шемседінов Тімур Гафарович',
    id: randomID(),
    faculties: ['ПБФ'],
  },
  {
    rating: 4.8,
    id: randomID(),
    avatar: 'https://kpi.ua/files/styles/story/public/images-story/2020-kp16-1.jpg?itok=t3zFp5Dv',
    username: 'Волокіта Артем Микалайович',
    faculties: ['ПБФ'],
  },
];
