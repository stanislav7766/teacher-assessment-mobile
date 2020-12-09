import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {Text} from 'react-native';
import {observer} from 'mobx-react-lite';
import {fetchFaculties} from '@api/faculty';
import {fetchAddLocalAdmin} from '@api/local-admin';
import {IFetchAddLocalAdminPayload} from '@api/local-admin/types';
import {IFaculties} from 'types/faculty';
import {useUniversity} from '@stores/university';
import useError from '@hooks/use-error';
import useMenuDrawer from '@hooks/use-menu-drawer';
import Header from '@components/header';
import {useModalHeader as useModalError, useModalPicker} from '@hooks/use-window-modal';
import {EasyRouterNavigator} from 'react-native-easy-router';
import {ERROR_OCCURRED} from '@constants/errors';
import AddLocalAdminView from './AddLocalAdmin.view';

interface SplashProps {
  navigator: EasyRouterNavigator;
}

const AddLocalAdmin = ({navigator}: SplashProps) => {
  const [refreshing, setRefreshing] = useState(true);
  const [username, setUsername] = useState<string>('');
  const [faculties, setFaculties] = useState<IFaculties>([]);
  const [selectedFaculties, setSelectedFaculties] = useState<IFaculties>([]);
  const [responseError, setResponseError, clearResponseError] = useError();
  const [ModalError, onShowModalError] = useModalError({
    text: responseError,
    onClose: clearResponseError,
    preset: 'close',
  });

  const {university} = useUniversity();
  const {id: universityId} = university;
  const pickerItems = useMemo(() => faculties.map(faculty => ({label: faculty, value: faculty})), [faculties]);
  const [ModalPicker, onShowModalPicker] = useModalPicker({
    pickerItems,
    selectedItems: selectedFaculties,
    setSelectedItems: setSelectedFaculties,
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFaculties({universityId})
      .then(({err, data}) => {
        err ? setResponseError(err) : setFaculties(data);
      })
      .catch(_ => {
        setResponseError(ERROR_OCCURRED);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, [setResponseError, universityId]);

  const onBack = useCallback((): void => {
    navigator.pop({animation: 'fade'});
  }, [navigator]);

  const onAddLocalAdmin = useCallback(
    (payload: IFetchAddLocalAdminPayload) => {
      setRefreshing(true);
      fetchAddLocalAdmin(payload)
        .then(({err}) => {
          err ? setResponseError(err) : onBack();
        })
        .catch(_ => {
          setResponseError(ERROR_OCCURRED);
        })
        .finally(() => {
          setRefreshing(false);
        });
    },
    [setResponseError, onBack],
  );

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const onPressAdd = (): void => {
    onAddLocalAdmin({faculties: selectedFaculties, localAdminUsername: username});
  };
  const onClearSelectedFaculties = (): void => {
    setSelectedFaculties([]);
  };

  useEffect(() => {
    responseError !== '' && onShowModalError();
  }, [responseError, onShowModalError]);

  const App = (
    <AddLocalAdminView
      onClearSelectedFaculties={onClearSelectedFaculties}
      username={username}
      onChangeUsername={setUsername}
      refresh={{refreshing, onRefresh}}
      selectedFaculties={selectedFaculties}
      onPressPicker={onShowModalPicker}
      onPressAdd={onPressAdd}
    />
  );

  const [ShowMenu, onShowMenu] = useMenuDrawer({children: App, navigator});

  return (
    <>
      {ShowMenu}
      <Header onPressBack={onBack} onPressMenu={onShowMenu} SubHeader={<Text>Додати керуючого</Text>} />
      {ModalError}
      {ModalPicker}
    </>
  );
};

export default observer(AddLocalAdmin);
