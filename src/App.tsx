import React from 'react';
import Main from '@screens/main';
import Splash from '@screens/splash';
import Navigator from 'react-native-easy-router';

const App: React.FC = () => <Navigator screens={{Splash, Main}} initialStack="Splash" />;

export default App;
