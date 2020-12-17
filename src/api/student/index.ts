import {IStudents} from 'types/student';
import {IResponse} from 'types/api/response';
import {fetchFaculties} from '@api/faculty';
import {fetchGroups} from '@api/group';
import {errStrExists} from '@utils/validation/isError';
import {IRequester, makeRequest} from '@utils/api/axios';
import {withResponseContract} from '@utils/api/with-response-contract';
import {IFetchDeleteFacultyStudentPayload, IFetchAddFacultyStudentPayload, IFetchFacultiesGroups} from './types';

export const fetchFacultyStudents = async (): Promise<IResponse<IStudents>> => {
  const fetcher = withResponseContract<IRequester, IStudents>(makeRequest, []);
  const result = await fetcher('GET', 'students/faculty-students', {});
  return result;
};

export const fetchFacultiesGroups = async (): Promise<IResponse<IFetchFacultiesGroups>> => {
  const [dataFaculties, dataGroups] = await Promise.all([fetchFaculties(), fetchGroups()]);
  const [errExists, err] = errStrExists(dataFaculties.err, dataGroups.err);
  return {
    err: errExists ? err : null,
    data: {
      faculties: dataFaculties.data,
      groups: dataGroups.data,
    },
  };
};

export const fetchDeleteFacultyStudent = async (
  payload: IFetchDeleteFacultyStudentPayload,
): Promise<IResponse<boolean>> => {
  const fetcher = withResponseContract<IRequester, boolean>(makeRequest, false);
  const result = await fetcher('POST', 'students/faculty-students/delete', payload);
  return result;
};

export const fetchAddFacultyStudent = async (payload: IFetchAddFacultyStudentPayload): Promise<IResponse<boolean>> => {
  const fetcher = withResponseContract<IRequester, boolean>(makeRequest, false);
  const result = await fetcher('POST', 'students/faculty-students/add', payload);
  return result;
};
