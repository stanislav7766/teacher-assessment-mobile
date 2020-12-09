declare module 'types/role' {
  export type Iteacher = 'TEACHER';
  export type Istudent = 'STUDENT';
  export type Iadmin = 'ADMIN';
  export type IlocalAdmin = 'LOCAL_ADMIN';
  export type IRole = Iteacher | Istudent | IlocalAdmin | Iadmin | '';
}
