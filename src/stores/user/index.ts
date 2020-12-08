import {createContext, useContext} from 'react';
import {IUser} from 'types/user';
import {makeAutoObservable} from 'mobx';

export class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  user: IUser = {};

  setUser = (user: IUser) => {
    this.user = {...user};
  };
}

export const UserContext = createContext<UserStore>({} as UserStore);
export const useUser = () => useContext(UserContext);
