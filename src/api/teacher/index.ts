import {ITeachers} from 'types/teacher';
import {IResponse} from 'types/api/response';
import {makeRequest} from '@utils/api/axios';
import {ERROR_OCCURRED} from '@constants/errors';
import {
  IFetchTeachersPayload,
  IFetchDeleteFacultyTeacherPayload,
  IFetchAddFacultyTeacherPayload,
  IFetchTeacherRatingPayload,
} from './types';

export const fetchTeachers = (payload: IFetchTeachersPayload): Promise<IResponse<ITeachers>> =>
  new Promise((resolve, _reject) => {
    makeRequest('GET', 'teachers/', payload)
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

export const fetchTeacherRating = (payload: IFetchTeacherRatingPayload): Promise<IResponse<number>> =>
  new Promise((resolve, _reject) => {
    makeRequest('GET', 'teachers/rating/', payload)
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
          data: 0,
        };
        resolve(response);
      });
  });

export const fetchFacultyTeachers = (): Promise<IResponse<ITeachers>> =>
  new Promise((resolve, _reject) => {
    makeRequest('GET', 'teachers/faculty-teachers', {})
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

export const fetchDeleteFacultyTeacher = (payload: IFetchDeleteFacultyTeacherPayload): Promise<IResponse<boolean>> =>
  new Promise((resolve, _reject) => {
    makeRequest('POST', 'teachers/faculty-teachers/delete', payload)
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

export const fetchAddFacultyTeacher = (payload: IFetchAddFacultyTeacherPayload): Promise<IResponse<boolean>> =>
  new Promise((resolve, _reject) => {
    makeRequest('POST', 'teachers/faculty-teachers/add', payload)
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
