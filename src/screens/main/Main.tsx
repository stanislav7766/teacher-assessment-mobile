import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';

const Main: React.FC = () => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.body}>Here we go</Text>
    </View>
  );
};

export default Main;
