import React from 'react';
import {StatusBar} from 'react-native';
import Main from '@screens/main';
import Splash from '@screens/splash';
import SignIn from '@screens/sign-in';
import Navigator from 'react-native-easy-router';

const App: React.FC = () => (
  <>
    <StatusBar barStyle="dark-content" />
    <Navigator screens={{Splash, Main, SignIn}} initialStack="Splash" />
  </>
);

export default App;
