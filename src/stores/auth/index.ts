import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';

export class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }
  isAuthenticated: boolean = false;

  setAuth = (isAuthenticated: boolean) => {
    this.isAuthenticated = isAuthenticated;
  };
}

export const AuthContext = createContext<AuthStore>({} as AuthStore);
export const useAuth = () => useContext(AuthContext);
