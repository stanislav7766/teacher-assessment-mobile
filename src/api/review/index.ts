import {IReviews, IActiveReviews, IGeneratedReviews} from 'types/review';
import {IResponse} from 'types/api/response';
import {makeRequest} from '@utils/api/axios';
import {ERROR_OCCURRED} from '@constants/errors';
import {
  IFetchActiveReviewPayload,
  IFetchLeaveReviewPayload,
  IStudentReviews,
  IFetchReviewsPayload,
  IFetchDeleteGeneratedReviewPayload,
  IFetchAddFacultyReviewPayload,
} from './types';

export const fetchReviews = (payload: IFetchReviewsPayload): Promise<IResponse<IReviews>> =>
  new Promise((resolve, _reject) => {
    makeRequest('GET', 'reviews/teacher-reviews/', payload)
      .then(({data}) => {
        const res = {
          err: null,
          data,
        };
        resolve(res);
      })
      .catch(err => {
        const message = err?.response?.data?.message ?? err?.message;
        const response = {
          err: message ?? ERROR_OCCURRED,
          data: [],
        };
        resolve(response);
      });
  });

export const fetchStudentReviews = (): Promise<IResponse<IStudentReviews>> =>
  new Promise((resolve, _reject) => {
    makeRequest('GET', 'reviews/student-reviews', {})
      .then(({data}) => {
        const res = {
          err: null,
          data,
        };
        resolve(res);
      })
      .catch(err => {
        const message = err?.response?.data?.message ?? err?.message;
        const response = {
          err: message ?? ERROR_OCCURRED,
          data: {
            leaved: [],
            active: [],
          },
        };
        resolve(response);
      });
  });

export const fetchActiveReview = (payload: IFetchActiveReviewPayload): Promise<IResponse<IActiveReviews>> =>
  new Promise((resolve, _reject) => {
    makeRequest('GET', 'reviews/student-reviews/', payload)
      .then(({data}) => {
        const res = {
          err: null,
          data: [data],
        };
        resolve(res);
      })
      .catch(err => {
        const message = err?.response?.data?.message ?? err?.message;
        const response = {
          err: message ?? ERROR_OCCURRED,
          data: [],
        };
        resolve(response);
      });
  });

export const fetchLeaveReview = (payload: IFetchLeaveReviewPayload): Promise<IResponse<boolean>> =>
  new Promise((resolve, _reject) => {
    const QAs = payload.QAs.map(({id, ...rest}) => rest);
    makeRequest('POST', 'reviews/student-reviews/leave-review', {...payload, QAs})
      .then(({data}) => {
        const res = {
          err: null,
          data,
        };
        resolve(res);
      })
      .catch(err => {
        const message = err?.response?.data?.message ?? err?.message;
        const response = {
          err: message ?? ERROR_OCCURRED,
          data: false,
        };
        resolve(response);
      });
  });

export const fetchGeneratedReviews = (): Promise<IResponse<IGeneratedReviews>> =>
  new Promise((resolve, _reject) => {
    makeRequest('GET', 'reviews/generated-reviews', {})
      .then(({data}) => {
        const res = {
          err: null,
          data,
        };
        resolve(res);
      })
      .catch(err => {
        const message = err?.response?.data?.message ?? err?.message;
        const response = {
          err: message ?? ERROR_OCCURRED,
          data: [],
        };
        resolve(response);
      });
  });

export const fetchDeleteGeneratedReview = (payload: IFetchDeleteGeneratedReviewPayload): Promise<IResponse<boolean>> =>
  new Promise((resolve, _reject) => {
    makeRequest('POST', 'reviews/generated-reviews/delete', payload)
      .then(({data}) => {
        const res = {
          err: null,
          data,
        };
        resolve(res);
      })
      .catch(err => {
        const message = err?.response?.data?.message ?? err?.message;
        const response = {
          err: message ?? ERROR_OCCURRED,
          data: false,
        };
        resolve(response);
      });
  });

export const fetchAddGeneratedReview = (payload: IFetchAddFacultyReviewPayload): Promise<IResponse<boolean>> =>
  new Promise((resolve, _reject) => {
    makeRequest('POST', 'reviews/generated-reviews/add', payload)
      .then(({data}) => {
        const res = {
          err: null,
          data,
        };
        resolve(res);
      })
      .catch(err => {
        const message = err?.response?.data?.message ?? err?.message;
        const response = {
          err: message ?? ERROR_OCCURRED,
          data: false,
        };
        resolve(response);
      });
  });
