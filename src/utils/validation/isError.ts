export const errStrExists = (err1: string | null, err2: string | null): [boolean, string | null] => [
  !!(err1 === null || err2 === null),
  err1 || err2,
];
