import React from 'react';
import {View} from 'react-native';
import Input from '@common-components/text-input';
import Btn from '@common-components/btn';
import Logo from '@components/logo';
import {IInputs} from 'types/common';
import {row, mt25, centerXY} from './styles';

type IOnChange = (text: string, type: string) => void;

declare interface ISignProps {
  inputs: IInputs;
  errors: IInputs;
  onChange: IOnChange;
  onPress: () => void;
}

const SignInView = ({onPress, onChange, errors, inputs}: ISignProps) => (
  <View style={centerXY}>
    <Logo />
    <View style={row}>
      <Input
        placeholder="Логін"
        error={errors?.email}
        value={inputs?.email}
        onChange={text => onChange(text, 'email')}
      />
    </View>
    <View style={row}>
      <Input
        placeholder="Пароль"
        value={inputs?.password}
        error={errors?.password}
        onChange={text => onChange(text, 'password')}
        secureValue
      />
    </View>
    <View style={[row, mt25]}>
      <Btn onPress={onPress} title="Увійти" />
    </View>
  </View>
);

export default SignInView;
