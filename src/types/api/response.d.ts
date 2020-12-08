declare module 'types/api/response' {
  export type IResponse<R> = {
    err: string | null;
    data: R;
  };
}
