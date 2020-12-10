import React, {useState, useEffect, useCallback} from 'react';
import {Text} from 'react-native';
import useMenuDrawer from '@hooks/use-menu-drawer';
import Header from '@components/header';
import useError from '@hooks/use-error';
import {EasyRouterNavigator} from 'react-native-easy-router';
import {useModalHeader as useModalError} from '@hooks/use-window-modal';
import {IUniversities, IUniversity} from 'types/university';
import {fetchUniversities} from '@api/university';
import {ERROR_OCCURRED} from '@constants/errors';
import UniversitiesView from './Universities.view';

declare interface IUniversitiesProps {
  navigator: EasyRouterNavigator;
}
const Universities = ({navigator}: IUniversitiesProps) => {
  const [universities, setUniversities] = useState<IUniversities>([]);
  const [refreshing, setRefreshing] = useState(true);
  const [responseError, setResponseError, clearResponseError] = useError();
  const [ModalError, onShowModalError] = useModalError({
    text: responseError,
    onClose: clearResponseError,
    preset: 'close',
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUniversities()
      .then(({err, data}) => {
        err ? setResponseError(err) : setUniversities(data);
      })
      .catch(_ => {
        setResponseError(ERROR_OCCURRED);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, [setResponseError]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const onUniversity = (university: IUniversity): void => {
    navigator.push('University', {university}, {animation: 'fade'});
  };

  const App = <UniversitiesView refresh={{refreshing, onRefresh}} universities={universities} onPress={onUniversity} />;
  const [ShowMenu, onShowMenu] = useMenuDrawer({navigator, children: App});

  useEffect(() => {
    responseError !== '' && onShowModalError();
  }, [responseError, onShowModalError]);

  return (
    <>
      {ShowMenu}
      <Header onPressBack={() => {}} onPressMenu={onShowMenu} SubHeader={<Text>Оберіть університет</Text>} />
      {ModalError}
    </>
  );
};

export default Universities;
