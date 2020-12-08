import {IReviews, IActiveReviews} from 'types/review';
import {IResponse} from 'types/api/response';
import {defaultReviews, defaultActiveReviews} from './default';
import {IFetchActiveReviewPayload, IFetchReviewsPayload} from './types';

export const fetchReviews = (payload: IFetchReviewsPayload): Promise<IResponse<IReviews>> =>
  new Promise((resolve, _reject) => {
    const response = {
      err: null,
      data: defaultReviews,
    };
    setTimeout(() => resolve(response), 500);
  });

export const fetchActiveReview = (payload: IFetchActiveReviewPayload): Promise<IResponse<IActiveReviews>> =>
  new Promise((resolve, _reject) => {
    const response = {
      err: 'Для вас не має активних опитувань на обраного викладача',
      data: [],
    };
    setTimeout(() => resolve(response), 500);
  });
