import {IFaculties} from 'types/faculty';

export type IFetchAddLocalAdminPayload = {
  localAdminUsername: string;
  faculties: IFaculties;
};

export type IFetchDeleteLocalAdminPayload = {
  localAdminId: string;
};
