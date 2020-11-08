import React from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from './styles';

declare interface ITouchable {
  onPress: IOnPress;
  Child: JSX.Element;
}
type IOnPress = () => void;

const Touchable = ({Child, onPress}: ITouchable) => (
  <TouchableOpacity style={styles.touchable} onPress={onPress}>
    {Child}
  </TouchableOpacity>
);

export default Touchable;
