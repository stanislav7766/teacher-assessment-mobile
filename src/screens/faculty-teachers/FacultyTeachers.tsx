import React, {useState, useEffect, useCallback} from 'react';
import {Text} from 'react-native';
import useMenuDrawer from '@hooks/use-menu-drawer';
import Header from '@components/header';
import {useUniversity} from '@stores/university';
import {EasyRouterNavigator} from 'react-native-easy-router';
import useError from '@hooks/use-error';
import {useModalHeader as useModalError, useModalFooter as useModalConfirm} from '@hooks/use-window-modal';
import {ITeachers, ITeacher} from 'types/teacher';
import {fetchFacultyTeachers, fetchDeleteFacultyTeacher} from '@api/teacher';
import {IFetchDeleteFacultyTeacherPayload} from '@api/teacher/types';
import {ERROR_OCCURRED} from '@constants/errors';
import {DELETE_FACULTY_TEACHER_CONFIRM} from '@constants/message';
import {observer} from 'mobx-react-lite';
import FacultyTeachersView from './FacultyTeachers.view';

declare interface IFacultyTeachersProps {
  navigator: EasyRouterNavigator;
}
const FacultyTeachers = ({navigator}: IFacultyTeachersProps) => {
  const [teachers, setTeachers] = useState<ITeachers>([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>('');
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
    fetchFacultyTeachers()
      .then(({err, data}) => {
        err ? setResponseError(err) : setTeachers(data);
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

  const onTeacher = (teacher: ITeacher): void => {
    setTimeout(() => navigator.push('Teacher', {teacher}, {animation: 'fade'}), 0);
  };
  const onBack = useCallback((): void => {
    navigator.pop({animation: 'fade'});
  }, [navigator]);

  const onDeleteFacultyTeacher = useCallback(
    (payload: IFetchDeleteFacultyTeacherPayload) => {
      setRefreshing(true);
      fetchDeleteFacultyTeacher(payload)
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

  const onPressAddFacultyTeacher = (): void => {
    navigator.push('AddFacultyTeacher', {}, {animation: 'fade'});
  };

  const onDeleteConfirmed = (): void => {
    onDeleteFacultyTeacher({teacherId: selectedTeacherId});
  };
  const onDeleteNotConfirmed = (): void => {
    setSelectedTeacherId('');
  };

  const [ModalConfirm, onShowModalConfirm] = useModalConfirm({
    text: DELETE_FACULTY_TEACHER_CONFIRM,
    onBottomYes: onDeleteConfirmed,
    onBottomNo: onDeleteNotConfirmed,
    preset: 'footer',
  });

  const onPressDelete = (teacher: ITeacher): void => {
    setSelectedTeacherId(teacher.id);
    onShowModalConfirm();
  };
  useEffect(() => {
    responseError !== '' && onShowModalError();
  }, [responseError, onShowModalError]);

  const App = (
    <FacultyTeachersView
      refresh={{refreshing, onRefresh}}
      name={university.name}
      preview={university.preview}
      teachers={teachers}
      onPress={onTeacher}
      onPressAddFacultyTeacher={onPressAddFacultyTeacher}
      onPressDelete={onPressDelete}
    />
  );

  const [ShowMenu, onShowMenu] = useMenuDrawer({children: App, navigator});

  return (
    <>
      {ShowMenu}
      <Header onPressBack={onBack} onPressMenu={onShowMenu} SubHeader={<Text>Викладачі факультету</Text>} />
      {ModalError}
      {ModalConfirm}
    </>
  );
};

export default observer(FacultyTeachers);
