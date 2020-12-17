import {IReviews, IActiveReviews, IGeneratedReviews, IActiveReview, ILeavedReviews} from 'types/review';
import {IResponse} from 'types/api/response';
import {IRequester, makeRequest} from '@utils/api/axios';
import {withResponseContract} from '@utils/api/with-response-contract';
import {randomID} from '@utils/random-id';
import {
  IFetchActiveReviewPayload,
  IFetchLeaveReviewPayload,
  IStudentReviews,
  IFetchReviewsPayload,
  IFetchDeleteGeneratedReviewPayload,
  IFetchAddFacultyReviewPayload,
} from './types';
import {QA} from './default';

const defaultStudentReiews: IStudentReviews = {
  active: [],
  leaved: [],
};
const defaultActiveReview: IActiveReview = {
  id: '',
  QAs: QA,
  username: '',
  teacherId: '',
};

export const fetchReviews = async (payload: IFetchReviewsPayload): Promise<IResponse<IReviews>> => {
  const fetcher = withResponseContract<IRequester, IReviews>(makeRequest, []);
  const {err, data} = await fetcher('GET', 'reviews/teacher-reviews/', payload);
  const mappedData: IReviews = data.map(review => ({...review, QAs: review.QAs.map(qa => ({...qa, id: randomID()}))}));
  return {err, data: mappedData};
};

export const fetchStudentReviews = async (): Promise<IResponse<IStudentReviews>> => {
  const fetcher = withResponseContract<IRequester, IStudentReviews>(makeRequest, defaultStudentReiews);
  const {
    err,
    data: {active, leaved},
  } = await fetcher('GET', 'reviews/student-reviews', {});
  const mappedActive: IActiveReviews = active.map(review => ({
    ...review,
    QAs: review.QAs.map(qa => ({...qa, id: randomID()})),
  }));
  const mappedLeaved: ILeavedReviews = leaved.map(review => ({
    ...review,
    QAs: review.QAs.map(qa => ({...qa, id: randomID()})),
  }));

  return {err, data: {active: mappedActive, leaved: mappedLeaved}};
};

export const fetchActiveReview = async (payload: IFetchActiveReviewPayload): Promise<IResponse<IActiveReviews>> => {
  const fetcher = withResponseContract<IRequester, IActiveReview>(makeRequest, defaultActiveReview);
  const {err, data} = await fetcher('GET', 'reviews/student-reviews/active-review/', payload);
  !err && (data.QAs = data.QAs.map(qa => ({...qa, id: randomID()})));
  return {err, data: [data]};
};

export const fetchLeaveReview = async (payload: IFetchLeaveReviewPayload): Promise<IResponse<boolean>> => {
  const QAs = payload.QAs.map(({id, ...rest}) => rest);
  const fetcher = withResponseContract<IRequester, boolean>(makeRequest, false);
  const result = await fetcher('POST', 'reviews/student-reviews/leave-review', {...payload, QAs});
  return result;
};

export const fetchGeneratedReviews = async (): Promise<IResponse<IGeneratedReviews>> => {
  const fetcher = withResponseContract<IRequester, IGeneratedReviews>(makeRequest, []);
  const result = await fetcher('GET', 'reviews/generated-reviews', {});
  return result;
};

export const fetchDeleteGeneratedReview = async (
  payload: IFetchDeleteGeneratedReviewPayload,
): Promise<IResponse<boolean>> => {
  const fetcher = withResponseContract<IRequester, boolean>(makeRequest, false);
  const result = await fetcher('POST', 'reviews/generated-reviews/delete', payload);
  return result;
};

export const fetchAddGeneratedReview = async (payload: IFetchAddFacultyReviewPayload): Promise<IResponse<boolean>> => {
  const fetcher = withResponseContract<IRequester, boolean>(makeRequest, false);
  const result = await fetcher('POST', 'reviews/generated-reviews/add', payload);
  return result;
};
