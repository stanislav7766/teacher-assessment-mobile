import {IFaculties, IFaculty} from 'types/faculty';
import {IGroup, IGroups} from 'types/group';

export type IFetchDeleteFacultyStudentPayload = {
  studentId: string;
};

export type IFetchAddFacultyStudentPayload = {
  studentUsername: string;
  faculty: IFaculty;
  group: IGroup;
};

export type IFetchFacultiesGroups = {
  faculties: IFaculties;
  groups: IGroups;
};
