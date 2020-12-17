import {ITeachers} from 'types/teacher';
import {IResponse} from 'types/api/response';
import {IRequester, makeRequest} from '@utils/api/axios';
import {ERROR_OCCURRED} from '@constants/errors';
import {withResponseContract} from '@utils/api/with-response-contract';
import {
  IFetchTeachersPayload,
  IFetchDeleteFacultyTeacherPayload,
  IFetchAddFacultyTeacherPayload,
  IFetchTeacherRatingPayload,
} from './types';

export const fetchTeachers = async (payload: IFetchTeachersPayload): Promise<IResponse<ITeachers>> => {
  const fetcher = withResponseContract<IRequester, ITeachers>(makeRequest, []);
  const result = await fetcher('GET', 'teachers/', payload);
  return result;
};

export const fetchTeacherRating = async (payload: IFetchTeacherRatingPayload): Promise<IResponse<number>> => {
  const fetcher = withResponseContract<IRequester, number>(makeRequest, 0);
  const result = await fetcher('GET', 'teachers/rating/', payload);
  return result;
};

export const fetchFacultyTeachers = async (): Promise<IResponse<ITeachers>> => {
  const fetcher = withResponseContract<IRequester, ITeachers>(makeRequest, []);
  const result = await fetcher('GET', 'teachers/faculty-teachers', {});
  return result;
};

export const fetchDeleteFacultyTeacher = async (
  payload: IFetchDeleteFacultyTeacherPayload,
): Promise<IResponse<boolean>> => {
  const fetcher = withResponseContract<IRequester, boolean>(makeRequest, false);
  const result = await fetcher('POST', 'teachers/faculty-teachers/delete', payload);
  return result;
};

export const fetchAddFacultyTeacher = async (payload: IFetchAddFacultyTeacherPayload): Promise<IResponse<boolean>> => {
  const fetcher = withResponseContract<IRequester, boolean>(makeRequest, false);
  const result = await fetcher('POST', 'teachers/faculty-teachers/add', payload);
  return result;
};
