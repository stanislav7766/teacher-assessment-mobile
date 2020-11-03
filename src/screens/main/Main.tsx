import React from 'react';
import {View, Text} from 'react-native';
import useSplash from '../../hooks/use-splash/useSplash';
import {styles} from './styles';
import {SPLASH_DISPLAY_LENGTH} from '../../constants/splash';

const App: React.FC = () => {
  useSplash(SPLASH_DISPLAY_LENGTH);
  return (
    <View style={styles.wrap}>
      <Text style={styles.body}>Here we go</Text>
    </View>
  );
};

export default App;
