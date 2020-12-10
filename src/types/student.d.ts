declare module 'types/student' {
  export type IStudent = {
    avatar?: string;
    username: string;
    id: string;
  };
  export type IStudents = Array<IStudent>;
}
