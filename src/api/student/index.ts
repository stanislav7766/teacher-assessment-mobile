import {IStudents} from 'types/student';
import {IResponse} from 'types/api/response';
import {ERROR_OCCURRED} from '@constants/errors';
import {fetchFaculties} from '@api/faculty';
import {fetchGroups} from '@api/group';
import {errStrExists} from '@utils/validation/isError';
import {defaultStudents} from './default';
import {IFetchDeleteFacultyStudentPayload, IFetchAddFacultyStudentPayload, IFetchFacultiesGroups} from './types';

export const fetchFacultyStudents = (): Promise<IResponse<IStudents>> =>
  new Promise((resolve, _reject) => {
    const response = {
      err: null,
      data: defaultStudents,
    };
    setTimeout(() => resolve(response), 500);
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
    const response = {
      err: null,
      data: true,
    };
    setTimeout(() => resolve(response), 500);
  });

export const fetchAddFacultyStudent = (payload: IFetchAddFacultyStudentPayload): Promise<IResponse<boolean>> =>
  new Promise((resolve, _reject) => {
    const response = {
      err: null,
      data: true,
    };
    setTimeout(() => resolve(response), 500);
  });
