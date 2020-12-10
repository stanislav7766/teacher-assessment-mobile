import {IFaculties, IFaculty} from 'types/faculty';
import {IGroups} from 'types/group';

export type IFetchDeleteFacultyStudentPayload = {
  studentId: string;
};

export type IFetchAddFacultyStudentPayload = {
  studentUsername: string;
  faculty: IFaculty;
};

export type IFetchFacultiesGroups = {
  faculties: IFaculties;
  groups: IGroups;
};
