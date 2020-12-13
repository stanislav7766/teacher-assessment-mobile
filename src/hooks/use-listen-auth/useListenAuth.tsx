import {useEffect, useCallback} from 'react';
import {useAuth} from '@stores/auth';
import {useUser} from '@stores/user';
import {useUniversity} from '@stores/university';
import {tokenExists} from '@utils/storage/tokens';
import {fetchCurrent} from '@utils/storage/current';
import {ICurrentUniversity} from 'types/university';
import {ICurrentUser} from 'types/user';
import {observer} from 'mobx-react-lite';

const useListenAuth = (): JSX.Element | null => {
  const {setAuth} = useAuth();
  const {clearUser, setUser} = useUser();
  const {clearUniversity, setUniversity} = useUniversity();

  const onTokens = useCallback(async () => {
    const accessExists = await tokenExists('access');
    const refreshExists = await tokenExists('refresh');
    const isValid = accessExists && refreshExists;
    setAuth(isValid);
  }, [setAuth]);

  const onCurrentUser = useCallback(async () => {
    const [isValid, value] = await fetchCurrent('user');
    isValid ? setUser(value as ICurrentUser) : clearUser();
  }, [clearUser, setUser]);

  const onCurrentUniversity = useCallback(async () => {
    const [isValid, value] = await fetchCurrent('university');
    isValid ? setUniversity(value as ICurrentUniversity) : clearUniversity();
  }, [clearUniversity, setUniversity]);

  const onCurrent = useCallback(async () => {
    await onCurrentUser();
    await onCurrentUniversity();
  }, [onCurrentUniversity, onCurrentUser]);

  useEffect(() => {
    (async () => {
      await onTokens();
      await onCurrent();
    })();
  }, [onCurrent, onTokens]);

  return null;
};

export default observer(useListenAuth);
