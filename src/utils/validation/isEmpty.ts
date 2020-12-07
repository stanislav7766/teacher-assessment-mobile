export const isEmptyString = (value: string | undefined): boolean =>
  !!(value !== undefined && value.trim().length === 0);

export const isEmptyArray = (arr: Array<any>): boolean => arr.length === 0;
