import AsyncStorage from '@react-native-async-storage/async-storage';

const isJsonString = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
export const getItem = async (key: string): Promise<unknown> => {
  const res: string | null = await AsyncStorage.getItem(key);
  return isJsonString(res as string) ? JSON.parse(res as string) : res;
};

export const setItem = async (key: string, data: unknown): Promise<void> => {
  const string = JSON.stringify(data);
  await AsyncStorage.setItem(key, string);
};
export const removeItem = async (key: string): Promise<void> => {
  await AsyncStorage.removeItem(key);
};
