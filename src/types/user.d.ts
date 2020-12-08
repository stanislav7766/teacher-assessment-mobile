declare module 'types/user' {
  import {IRole} from 'types/role';

  export type IUser = {
    id?: string;
    username?: string;
    rating?: number;
    avatar?: string;
    role?: IRole;
  };
}
