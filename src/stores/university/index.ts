import {createContext, useContext} from 'react';
import {ICurrentUniversity} from 'types/university';
import {makeAutoObservable} from 'mobx';
import {defaultUniversity} from '@constants/university';

export class UniversityStore {
  constructor() {
    makeAutoObservable(this);
  }

  university: ICurrentUniversity = defaultUniversity;
  universityExists: boolean = false;

  setUniversity = (university: ICurrentUniversity) => {
    this.university = {...university};
    this.universityExists = true;
  };
  clearUniversity = () => {
    this.university = defaultUniversity;
    this.universityExists = false;
  };
}

export const UniversityContext = createContext<UniversityStore>({} as UniversityStore);
export const useUniversity = () => useContext(UniversityContext);
