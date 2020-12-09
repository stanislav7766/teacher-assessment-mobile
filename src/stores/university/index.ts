import {createContext, useContext} from 'react';
import {IUniversity} from 'types/university';
import {makeAutoObservable} from 'mobx';

const defaultUniversity: IUniversity = {
  id: '',
  name: '',
  preview: '',
  rating: 0,
};

export class UniversityStore {
  constructor() {
    makeAutoObservable(this);
  }

  university: IUniversity = defaultUniversity;
  universityExists: boolean = false;

  setUniversity = (university: IUniversity) => {
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
