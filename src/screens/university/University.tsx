import React, {useState, useEffect, useCallback} from 'react';
import {Text} from 'react-native';
import useMenuDrawer from '@hooks/use-menu-drawer';
import Header from '@components/header';
import {EasyRouterNavigator} from 'react-native-easy-router';
import useError from '@hooks/use-error';
import {useModalHeader as useModalError} from '@hooks/use-window-modal';
import {ITeachers, ITeacher} from 'types/teacher';
import {IUniversity} from 'types/university';
import {fetchTeachers} from '@api/teacher';
import {ERROR_OCCURRED} from '@constants/errors';
import UniversityView from './University.view';

declare interface IUniversitiesProps {
  navigator: EasyRouterNavigator;
  university: IUniversity;
}
const Universities = ({navigator, university}: IUniversitiesProps) => {
  const [teachers, setTeachers] = useState<ITeachers>([]);
  const [refreshing, setRefreshing] = useState(true);
  const [responseError, setResponseError, clearResponseError] = useError();
  const [ModalError, onShowModalError] = useModalError({
    text: responseError,
    onClose: clearResponseError,
    preset: 'close',
  });
  const {id: universityId} = university;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTeachers({universityId})
      .then(({err, data}) => {
        err ? setResponseError(err) : setTeachers(data);
      })
      .catch(_ => {
        setResponseError(ERROR_OCCURRED);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, [setResponseError, universityId]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const onTeacher = (teacher: ITeacher): void => {
    setTimeout(() => navigator.push('Teacher', {teacher}, {animation: 'fade'}), 0);
  };
  const onBack = (): void => {
    navigator.pop({animation: 'fade'});
  };

  useEffect(() => {
    responseError !== '' && onShowModalError();
  }, [responseError, onShowModalError]);

  const App = (
    <UniversityView
      refresh={{refreshing, onRefresh}}
      name={university.name}
      preview={university.preview}
      teachers={teachers}
      onPress={onTeacher}
    />
  );

  const [ShowMenu, onShowMenu] = useMenuDrawer({children: App, navigator});

  return (
    <>
      {ShowMenu}
      <Header onPressBack={onBack} onPressMenu={onShowMenu} SubHeader={<Text>Обери викладача</Text>} />
      {ModalError}
    </>
  );
};

export default Universities;
