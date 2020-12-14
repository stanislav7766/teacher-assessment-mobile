import React from 'react';
import {View} from 'react-native';
import Input from '@common-components/text-input';
import Btn from '@common-components/btn';
import Logo from '@components/logo';
import {IInputs} from 'types/common';
import {row, mt25, centerXY, item} from './styles';

type IOnChange = (text: string, type: string) => void;

declare interface IViewProps {
  inputs: IInputs;
  onChange: IOnChange;
  onPress: () => void;
}

const SignInView = ({onPress, onChange, inputs}: IViewProps) => (
  <View style={centerXY}>
    <Logo />
    <View style={[row, item]}>
      <Input placeholder="Логін" value={inputs?.login} onChange={text => onChange(text, 'login')} />
    </View>
    <View style={[row, item]}>
      <Input placeholder="Пароль" value={inputs?.password} onChange={text => onChange(text, 'password')} secureValue />
    </View>
    <View style={[row, mt25, item]}>
      <Btn onPress={onPress} title="Увійти" />
    </View>
  </View>
);

export default SignInView;
