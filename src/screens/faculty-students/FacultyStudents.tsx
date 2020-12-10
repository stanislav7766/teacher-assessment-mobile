import React, {useState, useEffect, useCallback} from 'react';
import {Text} from 'react-native';
import useMenuDrawer from '@hooks/use-menu-drawer';
import Header from '@components/header';
import {useUniversity} from '@stores/university';
import {EasyRouterNavigator} from 'react-native-easy-router';
import useError from '@hooks/use-error';
import {useModalHeader as useModalError, useModalFooter as useModalConfirm} from '@hooks/use-window-modal';
import {IStudents, IStudent} from 'types/student';
import {fetchFacultyStudents, fetchDeleteFacultyStudent} from '@api/student';
import {IFetchDeleteFacultyStudentPayload} from '@api/student/types';
import {ERROR_OCCURRED} from '@constants/errors';
import {DELETE_FACULTY_STUDENT_CONFIRM} from '@constants/message';
import {observer} from 'mobx-react-lite';
import FacultyStudentsView from './FacultyStudents.view';

declare interface IFacultyStudentsProps {
  navigator: EasyRouterNavigator;
}
const FacultyStudents = ({navigator}: IFacultyStudentsProps) => {
  const [students, setStudents] = useState<IStudents>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
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
    fetchFacultyStudents()
      .then(({err, data}) => {
        err ? setResponseError(err) : setStudents(data);
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

  const onBack = useCallback((): void => {
    navigator.pop({animation: 'fade'});
  }, [navigator]);

  const onDeleteFacultyStudent = useCallback(
    (payload: IFetchDeleteFacultyStudentPayload) => {
      setRefreshing(true);
      fetchDeleteFacultyStudent(payload)
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

  const onPressAddFacultyStudent = (): void => {
    navigator.push('AddFacultyStudent', {}, {animation: 'fade'});
  };

  const onDeleteConfirmed = (): void => {
    onDeleteFacultyStudent({studentId: selectedStudentId});
  };
  const onDeleteNotConfirmed = (): void => {
    setSelectedStudentId('');
  };

  const [ModalConfirm, onShowModalConfirm] = useModalConfirm({
    text: DELETE_FACULTY_STUDENT_CONFIRM,
    onBottomYes: onDeleteConfirmed,
    onBottomNo: onDeleteNotConfirmed,
    preset: 'footer',
  });

  const onPressDelete = (student: IStudent): void => {
    setSelectedStudentId(student.id);
    onShowModalConfirm();
  };
  useEffect(() => {
    responseError !== '' && onShowModalError();
  }, [responseError, onShowModalError]);

  const App = (
    <FacultyStudentsView
      refresh={{refreshing, onRefresh}}
      name={university.name}
      preview={university.preview}
      students={students}
      onPressAddFacultyStudent={onPressAddFacultyStudent}
      onPressDelete={onPressDelete}
    />
  );

  const [ShowMenu, onShowMenu] = useMenuDrawer({children: App, navigator});

  return (
    <>
      {ShowMenu}
      <Header onPressBack={onBack} onPressMenu={onShowMenu} SubHeader={<Text>Студенти факультету</Text>} />
      {ModalError}
      {ModalConfirm}
    </>
  );
};

export default observer(FacultyStudents);
