import {createContext, useContext} from 'react';
import {ICurrentUser} from 'types/user';
import {makeAutoObservable} from 'mobx';
import {defaultUser} from '@constants/user';

export class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  user: ICurrentUser = defaultUser;
  userExists: boolean = false;

  setUser = (user: ICurrentUser) => {
    this.user = {...user};
    this.userExists = true;
  };
  clearUser = () => {
    this.user = defaultUser;
    this.userExists = false;
  };
}

export const UserContext = createContext<UserStore>({} as UserStore);
export const useUser = () => useContext(UserContext);
