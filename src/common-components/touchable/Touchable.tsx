import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IOnPress} from 'types/common';
import {styles} from './styles';

declare interface ITouchable {
  onPress: IOnPress;
  Child: JSX.Element;
}

const Touchable = ({Child, onPress}: ITouchable) => (
  <TouchableOpacity style={styles.touchable} onPress={onPress}>
    {Child}
  </TouchableOpacity>
);

export default Touchable;
