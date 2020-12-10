import {IFaculties} from 'types/faculty';

export type IFetchTeachersPayload = {
  universityId: string;
};

export type IFetchDeleteFacultyTeacherPayload = {
  teacherId: string;
};

export type IFetchAddFacultyTeacherPayload = {
  teacherUsername: string;
  faculties: IFaculties;
};
