import React from 'react';
import {View, Text} from 'react-native';
import Header from '@components/header';
import {IOnPress} from 'types/common';
import {styles} from './styles';

const Main: React.FC = () => {
  const onPress: IOnPress = (): void => {};
  return (
    <>
      <Header onPressBack={onPress} onPressMenu={onPress} SubHeader={<Text style={styles.body}>Main Screen</Text>} />
      <View style={styles.wrap}>
        <Text style={styles.body}>Here we go</Text>
      </View>
    </>
  );
};

export default Main;
