declare module 'types/university' {
  export type IUniversity = {
    rating: number;
    preview: string;
    name: string;
    id: string;
  };
  export type ICurrentUniversity = {
    preview: string;
    name: string;
    id: string;
  };
  export type IUniversities = Array<IUniversity>;
}
