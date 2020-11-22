import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {styles} from './styles';

interface FormProps {
  children: ReactNode;
  backgroundColor?: string;
  height?: number;
}

const Form = ({children, backgroundColor, height}: FormProps) => {
  const isHeight = height !== undefined;
  return <View style={[styles.form, {backgroundColor}, isHeight && {height}]}>{children}</View>;
};
Form.defaultProps = {
  backgroundColor: ACCENT_COLOR_BLUE,
  height: undefined,
};
export default Form;
