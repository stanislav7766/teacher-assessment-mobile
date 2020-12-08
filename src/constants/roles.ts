import {IRole, Iadmin, IlocalAdmin, Istudent, Iteacher} from 'types/role';

export const TEACHER: Iteacher = 'TEACHER';
export const STUDENT: Istudent = 'STUDENT';
export const LOCAL_ADMIN: IlocalAdmin = 'LOCAL_ADMIN';
export const ADMIN: Iadmin = 'ADMIN';

export const getUserRole = (role: IRole | undefined): string => {
  const roles = {
    [TEACHER]: 'Викладач',
    [STUDENT]: 'Студент',
    [ADMIN]: 'Ректор',
    [LOCAL_ADMIN]: 'Керуючий',
    '': '',
  };
  return roles[role ?? ''];
};
