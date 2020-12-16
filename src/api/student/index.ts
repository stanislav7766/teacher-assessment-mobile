import {IStudents} from 'types/student';
import {IResponse} from 'types/api/response';
import {fetchFaculties} from '@api/faculty';
import {fetchGroups} from '@api/group';
import {errStrExists} from '@utils/validation/isError';
import {makeRequest} from '@utils/api/axios';
import {ERROR_OCCURRED} from '@constants/errors';
import {IFetchDeleteFacultyStudentPayload, IFetchAddFacultyStudentPayload, IFetchFacultiesGroups} from './types';

export const fetchFacultyStudents = (): Promise<IResponse<IStudents>> =>
  new Promise((resolve, _reject) => {
    makeRequest('GET', 'students/faculty-students', {})
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

export const fetchFacultiesGroups = (): Promise<IResponse<IFetchFacultiesGroups>> =>
  Promise.all([fetchFaculties(), fetchGroups()])
    .then(([dataFaculties, dataGroups]) => {
      const [errExists, err] = errStrExists(dataFaculties.err, dataGroups.err);
      return errExists
        ? {
            err,
            data: {
              faculties: dataFaculties.data,
              groups: dataGroups.data,
            },
          }
        : {
            err: null,
            data: {
              faculties: dataFaculties.data,
              groups: dataGroups.data,
            },
          };
    })
    .catch(_err => {
      return {
        err: ERROR_OCCURRED,
        data: {
          faculties: [],
          groups: [],
        },
      };
    });

export const fetchDeleteFacultyStudent = (payload: IFetchDeleteFacultyStudentPayload): Promise<IResponse<boolean>> =>
  new Promise((resolve, _reject) => {
    makeRequest('POST', 'students/faculty-students/delete', payload)
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

export const fetchAddFacultyStudent = (payload: IFetchAddFacultyStudentPayload): Promise<IResponse<boolean>> =>
  new Promise((resolve, _reject) => {
    makeRequest('POST', 'students/faculty-students/add', payload)
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
