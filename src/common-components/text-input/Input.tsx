import React from 'react';
import {View, TextInput, Text, KeyboardTypeOptions} from 'react-native';
import {isEmptyString} from '@utils/validation/isEmpty';
import {styles, getBorderColor, inputDefaultSize} from './styles';

const Input = ({
  error,
  value,
  width,
  height,
  keyboardType,
  autoCompleteType,
  secureValue,
  placeholder,
  onChange,
}: InputProps) => {
  const inputBorder = getBorderColor(!isEmptyString(error));

  return (
    <View style={[styles.container, {width}]}>
      <Text style={styles.placeholder}>{placeholder}</Text>
      <TextInput
        secureTextEntry={secureValue}
        autoCompleteType={autoCompleteType}
        style={[styles.input, inputBorder, {height}]}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChange}
      />
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};
Input.defaultProps = {
  keyboardType: 'default',
  autoCompleteType: 'off',
  secureValue: false,
  error: '',
  width: inputDefaultSize.width,
  height: inputDefaultSize.height,
};

export default Input;

export interface InputProps {
  value: string;
  autoCompleteType?: 'off';
  secureValue?: boolean;
  onChange: (text: string) => void;
  error?: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  width?: number;
  height?: number;
}
