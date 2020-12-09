import React, {useState, useCallback, useEffect} from 'react';
import {IInputs} from 'types/common';
import {useAuth} from '@stores/auth';
import {useUser} from '@stores/user';
import {useUniversity} from '@stores/university';
import {observer} from 'mobx-react-lite';
import {fetchSign} from '@api/auth';
import useError from '@hooks/use-error';
import {useModalHeader as useModalError} from '@hooks/use-window-modal';
import {EasyRouterNavigator} from 'react-native-easy-router';
import {ERROR_OCCURRED} from '@constants/errors';
import SignInView from './SignIn.view';

interface SplashProps {
  navigator: EasyRouterNavigator;
}

const SignIn = ({navigator}: SplashProps) => {
  const [refreshing, setRefreshing] = useState(true);
  const {setAuth} = useAuth();
  const {setUser} = useUser();
  const {setUniversity} = useUniversity();
  const [inputs, setInputs] = useState<IInputs>({email: '', password: ''});
  const [responseError, setResponseError, clearResponseError] = useError();
  const [ModalError, onShowModalError] = useModalError({
    text: responseError,
    onClose: clearResponseError,
    preset: 'close',
  });

  const onRefresh = useCallback(
    (_inputs: IInputs) => {
      setRefreshing(true);
      fetchSign(_inputs)
        .then(({err, data}) => {
          if (err) {
            setResponseError(err);
            return;
          }
          setAuth(data.isAuthenticated);
          setUser(data.user);
          setUniversity(data.university);
        })
        .catch(_ => {
          setResponseError(ERROR_OCCURRED);
        })
        .finally(() => {
          setRefreshing(false);
        });
    },
    [setAuth, setResponseError, setUser, setUniversity],
  );

  const onChange = (text: string, type: string): void => {
    setInputs((oldInput: IInputs) => ({
      ...oldInput,
      [type]: text,
    }));
  };

  const onPress = (): void => {
    onRefresh(inputs);
  };
  useEffect(() => {
    responseError !== '' && onShowModalError();
  }, [responseError, onShowModalError]);

  return (
    <>
      <SignInView onChange={onChange} onPress={onPress} inputs={inputs} />
      {ModalError}
    </>
  );
};

export default observer(SignIn);
