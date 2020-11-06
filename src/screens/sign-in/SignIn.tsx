import React, {useState} from 'react';
import SignInView, {IInputs} from '@components/sign-in';
import {EasyRouterNavigator} from 'react-native-easy-router';

interface SplashProps {
  navigator: EasyRouterNavigator;
}

const SignIn = ({navigator}: SplashProps) => {
  const [inputs, setInputs] = useState<IInputs>({email: '', password: ''});
  const [errors] = useState<IInputs>({email: '', password: ''});

  const onChange = (text: string, type: string): void => {
    setInputs((oldInput: IInputs) => ({
      ...oldInput,
      [type]: text,
    }));
  };

  const onPress = (): void => {};

  return <SignInView onChange={onChange} onPress={onPress} inputs={inputs} errors={errors} />;
};

export default SignIn;
