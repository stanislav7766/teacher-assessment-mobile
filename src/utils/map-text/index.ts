export const mapNextLine = (text: string): string => text.split(' ').join('\n');

export const mapNextLineFirst = (username: string): string => {
  const [first, ...rest] = username.split(' ');
  return `${first}\n${rest.join(' ')}`;
};

export const getNFirstWords = (text: string, n: number) => {
  const newText: Array<string> = text.replace(/\s+/g, ' ').trim().split(' ');
  return newText.slice(0, n).join(' ');
};

export const getNFirstChars = (text: string, n: number) => {
  const newText: string = text.replace(/\s+/g, ' ').trim();
  return newText.slice(0, n);
};
