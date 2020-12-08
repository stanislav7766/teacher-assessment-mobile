import {IReviews, IActiveReviews} from 'types/review';
import {IResponse} from 'types/api/response';
import {defaultReviews, defaultActiveReviews, defaultLeavedReviews} from './default';
import {
  IFetchActiveReviewPayload,
  IFetchLeaveReviewPayload,
  IFetchStudentReviewsPayload,
  IStudentReviews,
  IFetchReviewsPayload,
} from './types';

export const fetchReviews = (payload: IFetchReviewsPayload): Promise<IResponse<IReviews>> =>
  new Promise((resolve, _reject) => {
    const response = {
      err: null,
      data: defaultReviews,
    };
    setTimeout(() => resolve(response), 500);
  });

export const fetchStudentReviews = (payload: IFetchStudentReviewsPayload): Promise<IResponse<IStudentReviews>> =>
  new Promise((resolve, _reject) => {
    const response = {
      err: null,
      data: {
        active: defaultActiveReviews,
        leaved: defaultLeavedReviews,
      },
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

export const fetchLeaveReview = (payload: IFetchLeaveReviewPayload): Promise<IResponse<boolean>> =>
  new Promise((resolve, _reject) => {
    const response = {
      err: null,
      data: true,
    };
    setTimeout(() => resolve(response), 500);
  });
