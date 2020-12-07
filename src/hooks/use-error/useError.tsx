import {useState, useCallback} from 'react';

const useError = (): [string, (err: string) => void, () => void] => {
  const [error, setError] = useState<string>('');

  const updateError = useCallback((err: string): void => {
    setError(err);
  }, []);
  const clearError = useCallback((): void => {
    setError('');
  }, []);

  return [error, updateError, clearError];
};

export default useError;
