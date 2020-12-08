import React from 'react';
import storesConfig from '@config/stores';
import ComposeStore from '@components/compose-store';
import UseListenAuth from '@hooks/use-listen-auth';
import {StatusBar} from 'react-native';
import UseNavigator from '@hooks/use-navigator';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <UseNavigator />
      <UseListenAuth />
    </>
  );
};

export default () => <ComposeStore Child={<App />} wrappers={storesConfig} />;
