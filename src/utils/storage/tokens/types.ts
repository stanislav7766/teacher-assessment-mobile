export type ITokenType = 'refresh' | 'access';
export type ITokenItem = string | boolean;

export type IGetTokenResponse = {
  err: string | null;
  result: ITokenItem | null;
};
