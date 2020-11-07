import React, {ReactChild, ReactChildren} from 'react';
import {View} from 'react-native';
import {styles} from './styles';

interface FormProps {
  children: ReactChild | ReactChildren;
}

const Form = ({children}: FormProps) => <View style={styles.form}>{children}</View>;

export default Form;
