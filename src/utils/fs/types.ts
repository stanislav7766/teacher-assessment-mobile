export type IResponseFS<R> = {
  err: string | null;
  result: R;
};

export type IWriteFileResponse = IResponseFS<boolean>;
export type IReadFileResponse = IResponseFS<string | null>;
export type IFileExistsResponse = IResponseFS<boolean>;
