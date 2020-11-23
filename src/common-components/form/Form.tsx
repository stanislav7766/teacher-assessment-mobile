import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {styles} from './styles';

interface FormProps {
  children: ReactNode;
  backgroundColor?: string;
  height?: number;
  width?: number;
}

const Form = ({children, backgroundColor, height, width}: FormProps) => {
  const isHeight = height !== undefined;
  const isWidth = width !== undefined;
  return <View style={[styles.form, {backgroundColor}, isHeight && {height}, isWidth && {width}]}>{children}</View>;
};
Form.defaultProps = {
  backgroundColor: ACCENT_COLOR_BLUE,
  height: undefined,
  width: undefined,
};
export default Form;
