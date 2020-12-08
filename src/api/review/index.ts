import {IReviews} from 'types/review';
import {IResponse} from 'types/api/response';
import {defaultReviews} from './default';

export const fetchReviews = (): Promise<IResponse<IReviews>> =>
  new Promise((resolve, _reject) => {
    const response = {
      err: null,
      data: defaultReviews,
    };
    setTimeout(() => resolve(response), 500);
  });
