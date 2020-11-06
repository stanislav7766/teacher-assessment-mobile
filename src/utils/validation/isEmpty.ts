export const isEmptyString = (value: string | undefined): boolean =>
  !!(value !== undefined && value.trim().length === 0);
