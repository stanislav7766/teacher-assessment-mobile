import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {Text} from 'react-native';
import {fetchFaculties} from '@api/faculty';
import {fetchAddFacultyTeacher} from '@api/teacher';
import {IFetchAddFacultyTeacherPayload} from '@api/teacher/types';
import {IFaculties} from 'types/faculty';
import useError from '@hooks/use-error';
import useMenuDrawer from '@hooks/use-menu-drawer';
import Header from '@components/header';
import {useModalHeader as useModalError, useModalPicker} from '@hooks/use-window-modal';
import {EasyRouterNavigator} from 'react-native-easy-router';
import {ERROR_OCCURRED} from '@constants/errors';
import AddFacultyTeacherView from './AddFacultyTeacher.view';

interface IAddFacultyTeacherProps {
  navigator: EasyRouterNavigator;
}

const AddFacultyTeacher = ({navigator}: IAddFacultyTeacherProps) => {
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

  const pickerItems = useMemo(() => faculties.map(faculty => ({label: faculty, value: faculty})), [faculties]);
  const [ModalPicker, onShowModalPicker] = useModalPicker({
    pickerItems,
    selectedItems: selectedFaculties,
    setSelectedItems: setSelectedFaculties,
    mode: 'multiple',
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFaculties()
      .then(({err, data}) => {
        err ? setResponseError(err) : setFaculties(data);
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

  const onAddFacultyTeacher = useCallback(
    (payload: IFetchAddFacultyTeacherPayload) => {
      setRefreshing(true);
      fetchAddFacultyTeacher(payload)
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
    onAddFacultyTeacher({faculties: selectedFaculties, teacherUsername: username});
  };
  const onClearSelectedFaculties = (): void => {
    setSelectedFaculties([]);
  };

  useEffect(() => {
    responseError !== '' && onShowModalError();
  }, [responseError, onShowModalError]);

  const App = (
    <AddFacultyTeacherView
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
      <Header onPressBack={onBack} onPressMenu={onShowMenu} SubHeader={<Text>Додати викладача</Text>} />
      {ModalError}
      {ModalPicker}
    </>
  );
};

export default AddFacultyTeacher;
