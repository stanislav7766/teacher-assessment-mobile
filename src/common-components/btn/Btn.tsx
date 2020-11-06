import React from 'react';
import {TouchableOpacity, Text, GestureResponderEvent} from 'react-native';
import {styles, btnDefaultSize} from './styles';

const Btn = ({title, width, height, onPress}: BtnProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, {width, height}]}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};
Btn.defaultProps = {
  width: btnDefaultSize.width,
  height: btnDefaultSize.height,
};

export default Btn;

export interface BtnProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  width?: number;
  height?: number;
}
