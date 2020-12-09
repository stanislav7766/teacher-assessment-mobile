import {createContext, useContext} from 'react';
import {IUser} from 'types/user';
import {makeAutoObservable} from 'mobx';

const defaultUser: IUser = {
  id: '',
  username: '',
  role: '',
};

export class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  user: IUser = defaultUser;
  userExists: boolean = false;

  setUser = (user: IUser) => {
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
