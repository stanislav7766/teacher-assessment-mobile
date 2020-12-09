import {useEffect} from 'react';
import {useAuth} from '@stores/auth';
import {useUser} from '@stores/user';
import {useUniversity} from '@stores/university';
import {observer} from 'mobx-react-lite';

const useListenAuth = (): JSX.Element | null => {
  const {isAuthenticated} = useAuth();
  const {clearUser} = useUser();
  const {clearUniversity} = useUniversity();

  useEffect(() => {
    if (!isAuthenticated) {
      clearUser();
      clearUniversity();
    }
  }, [isAuthenticated, clearUser, clearUniversity]);

  return null;
};

export default observer(useListenAuth);
