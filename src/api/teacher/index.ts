import {ITeachers} from 'types/teacher';
import {IResponse} from 'types/api/response';
import {defaultTeachers} from './default';
import {IFetchTeachersPayload, IFetchDeleteFacultyTeacherPayload, IFetchAddFacultyTeacherPayload} from './types';

export const fetchTeachers = (payload: IFetchTeachersPayload): Promise<IResponse<ITeachers>> =>
  new Promise((resolve, _reject) => {
    const response = {
      err: null,
      data: defaultTeachers,
    };
    setTimeout(() => resolve(response), 500);
  });

export const fetchFacultyTeachers = (): Promise<IResponse<ITeachers>> =>
  new Promise((resolve, _reject) => {
    const response = {
      err: null,
      data: defaultTeachers,
    };
    setTimeout(() => resolve(response), 500);
  });

export const fetchDeleteFacultyTeacher = (payload: IFetchDeleteFacultyTeacherPayload): Promise<IResponse<boolean>> =>
  new Promise((resolve, _reject) => {
    const response = {
      err: null,
      data: true,
    };
    setTimeout(() => resolve(response), 500);
  });

export const fetchAddFacultyTeacher = (payload: IFetchAddFacultyTeacherPayload): Promise<IResponse<boolean>> =>
  new Promise((resolve, _reject) => {
    const response = {
      err: null,
      data: true,
    };
    setTimeout(() => resolve(response), 500);
  });
