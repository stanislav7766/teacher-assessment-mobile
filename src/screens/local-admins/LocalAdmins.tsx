import React, {useState, useEffect, useCallback} from 'react';
import {Text} from 'react-native';
import useMenuDrawer from '@hooks/use-menu-drawer';
import Header from '@components/header';
import {EasyRouterNavigator} from 'react-native-easy-router';
import useError from '@hooks/use-error';
import {useUniversity} from '@stores/university';
import {useModalHeader as useModalError, useModalFooter as useModalConfirm} from '@hooks/use-window-modal';
import {ILocalAdmins, ILocalAdmin} from 'types/local-admin';
import {fetchLocalAdmins, fetchDeleteLocalAdmin} from '@api/local-admin';
import {IFetchDeleteLocalAdminPayload} from '@api/local-admin/types';
import {ERROR_OCCURRED} from '@constants/errors';
import {DELETE_LOCAL_ADMIN_CONFIRM} from '@constants/message';
import {observer} from 'mobx-react-lite';
import LocalAdminsView from './LocalAdmins.view';

declare interface IUniversitiesProps {
  navigator: EasyRouterNavigator;
}
const LocalAdmins = ({navigator}: IUniversitiesProps) => {
  const [localAdmins, setLocalAdmins] = useState<ILocalAdmins>([]);
  const [selectedLocalAdminId, setSelectedLocalAdminId] = useState<string>('');
  const [refreshing, setRefreshing] = useState(true);
  const [responseError, setResponseError, clearResponseError] = useError();
  const [ModalError, onShowModalError] = useModalError({
    text: responseError,
    onClose: clearResponseError,
    preset: 'close',
  });

  const {university} = useUniversity();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchLocalAdmins()
      .then(({err, data}) => {
        err ? setResponseError(err) : setLocalAdmins(data);
      })
      .catch(_ => {
        setResponseError(ERROR_OCCURRED);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, [setResponseError]);

  const onBack = useCallback((): void => {
    navigator.pop({animation: 'fade'});
  }, [navigator]);

  const onDeleteLocalAdmin = useCallback(
    (payload: IFetchDeleteLocalAdminPayload) => {
      setRefreshing(true);
      fetchDeleteLocalAdmin(payload)
        .then(({err}) => {
          err ? setResponseError(err) : onRefresh();
        })
        .catch(_ => {
          setResponseError(ERROR_OCCURRED);
        })
        .finally(() => {
          setRefreshing(false);
        });
    },
    [setResponseError, onRefresh],
  );

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const onPressAddLocalAdmin = (): void => {
    navigator.push('AddLocalAdmin', {}, {animation: 'fade'});
  };

  const onDeleteConfirmed = (): void => {
    onDeleteLocalAdmin({localAdminId: selectedLocalAdminId});
  };
  const onDeleteNotConfirmed = (): void => {
    setSelectedLocalAdminId('');
  };

  const [ModalConfirm, onShowModalConfirm] = useModalConfirm({
    text: DELETE_LOCAL_ADMIN_CONFIRM,
    onBottomYes: onDeleteConfirmed,
    onBottomNo: onDeleteNotConfirmed,
    preset: 'footer',
  });

  const onPressDelete = (localAdmin: ILocalAdmin): void => {
    setSelectedLocalAdminId(localAdmin.id);
    onShowModalConfirm();
  };

  useEffect(() => {
    responseError !== '' && onShowModalError();
  }, [responseError, onShowModalError]);

  const App = (
    <LocalAdminsView
      refresh={{refreshing, onRefresh}}
      name={university.name}
      preview={university.preview}
      onPressAddLocalAdmin={onPressAddLocalAdmin}
      onPressDelete={onPressDelete}
      localAdmins={localAdmins}
    />
  );

  const [ShowMenu, onShowMenu] = useMenuDrawer({children: App, navigator});

  return (
    <>
      {ShowMenu}
      <Header onPressBack={onBack} onPressMenu={onShowMenu} SubHeader={<Text>Обери викладача</Text>} />
      {ModalError}
      {ModalConfirm}
    </>
  );
};

export default observer(LocalAdmins);
