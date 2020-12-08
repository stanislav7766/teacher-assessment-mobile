import {useEffect} from 'react';
import {useAuth} from '@stores/auth';
import {useUser} from '@stores/user';
import {observer} from 'mobx-react-lite';

const useListenAuth = (): JSX.Element | null => {
  const {isAuthenticated} = useAuth();
  const {setUser} = useUser();

  useEffect(() => {
    !isAuthenticated && setUser({});
  }, [isAuthenticated, setUser]);

  return null;
};

export default observer(useListenAuth);
