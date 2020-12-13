declare module 'types/user' {
  import {IRole} from 'types/role';

  export type ICurrentUser = {
    id: string;
    username: string;
    avatar?: string;
    role: IRole;
  };
}
