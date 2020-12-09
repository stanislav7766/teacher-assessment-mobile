import {IFaculties} from 'types/faculty';

declare module 'types/local-admin' {
  export type ILocalAdmin = {
    rating: number;
    avatar?: string;
    username: string;
    id: string;
    faculties: IFaculties;
  };
  export type ILocalAdmins = Array<ILocalAdmin>;
}
