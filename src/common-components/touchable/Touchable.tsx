import React from 'react';
import {TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {IOnPress} from 'types/common';
import {styles} from './styles';

declare interface ITouchable {
  onPress: IOnPress;
  Child: JSX.Element;
  withFeedback?: boolean;
}

const Touchable = ({Child, withFeedback, onPress}: ITouchable) =>
  withFeedback ? (
    <TouchableOpacity style={styles.touchable} onPress={onPress}>
      {Child}
    </TouchableOpacity>
  ) : (
    <TouchableWithoutFeedback style={styles.touchable} onPress={onPress}>
      <View>{Child}</View>
    </TouchableWithoutFeedback>
  );

Touchable.defaultProps = {
  withFeedback: true,
};

export default Touchable;
