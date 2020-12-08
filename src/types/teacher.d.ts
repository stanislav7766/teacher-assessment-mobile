declare module 'types/teacher' {
  export type ITeacher = {
    rating: number;
    avatar?: string;
    username: string;
    id: string;
  };
  export type ITeachers = Array<ITeacher>;
}
