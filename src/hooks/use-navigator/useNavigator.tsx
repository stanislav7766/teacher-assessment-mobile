import React, {useRef, useEffect} from 'react';
import Navigator, {EasyRouterNavigator} from 'react-native-easy-router';
import {useUser} from '@stores/user';
import {useAuth} from '@stores/auth';
import {getScreens} from '@config/screens';
import {observer} from 'mobx-react-lite';

const UseNavigator = () => {
  const auth = useAuth();
  const {user} = useUser();
  const {isAuthenticated} = auth;

  const refNavigator = useRef<EasyRouterNavigator | null>(null);
  const {initial, screens} = getScreens(user?.role);

  const RoleNavigator = (
    <Navigator
      navigatorRef={ref => {
        refNavigator.current = ref;
      }}
      screens={screens}
      initialStack={initial}
    />
  );

  const resetToMain = (): void => {
    if (refNavigator.current?.stack?.length === 1) return;
    refNavigator?.current?.resetFrom(refNavigator?.current?.stack[0].id, 'Main');
  };

  useEffect(() => {
    resetToMain();
  }, [isAuthenticated]);

  return RoleNavigator;
};

export default observer(UseNavigator);
