import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {Text} from 'react-native';
import {fetchAddFacultyStudent, fetchFacultiesGroups} from '@api/student';
import {IFetchAddFacultyStudentPayload} from '@api/student/types';
import {IFaculties} from 'types/faculty';
import {IGroups} from 'types/group';
import useError from '@hooks/use-error';
import useMenuDrawer from '@hooks/use-menu-drawer';
import Header from '@components/header';
import {useModalHeader as useModalError, useModalPicker} from '@hooks/use-window-modal';
import {EasyRouterNavigator} from 'react-native-easy-router';
import {ERROR_OCCURRED} from '@constants/errors';
import AddFacultyStudentView from './AddFacultyStudent.view';

interface IAddFacultyStudentProps {
  navigator: EasyRouterNavigator;
}

type IPicker = 'faculty' | 'group';
type IFetchedValues = {
  faculties: IFaculties;
  groups: IGroups;
};
const fetchedValuesDefault: IFetchedValues = {
  faculties: [],
  groups: [],
};

const AddFacultyStudent = ({navigator}: IAddFacultyStudentProps) => {
  const [refreshing, setRefreshing] = useState(true);
  const [username, setUsername] = useState<string>('');
  const [fetchedValues, setFetchedValues] = useState<IFetchedValues>(fetchedValuesDefault);
  const [selectedFaculties, setSelectedFaculties] = useState<IFaculties>([]);
  const [selectedGroups, setSelectedGroups] = useState<IGroups>([]);
  const [responseError, setResponseError, clearResponseError] = useError();
  const [ModalError, onShowModalError] = useModalError({
    text: responseError,
    onClose: clearResponseError,
    preset: 'close',
  });
  const [picker, setPicker] = useState<IPicker>('faculty');
  const isPickerFaculty = (_picker: IPicker) => _picker === 'faculty';
  const {faculties, groups} = fetchedValues;

  const pickerFaculties = useMemo(() => faculties.map(faculty => ({label: faculty, value: faculty})), [faculties]);
  const pickerGroups = useMemo(() => groups.map(group => ({label: group, value: group})), [groups]);

  const configPicker = useMemo(
    () => ({
      pickerItems: isPickerFaculty(picker) ? pickerFaculties : pickerGroups,
      selectedItems: isPickerFaculty(picker) ? selectedFaculties : selectedGroups,
      setSelectedItems: isPickerFaculty(picker) ? setSelectedFaculties : setSelectedGroups,
      mode: 'single' as 'single',
    }),
    [picker, pickerFaculties, pickerGroups, selectedFaculties, selectedGroups],
  );

  const [ModalPicker, onShowModalPicker] = useModalPicker(configPicker);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFacultiesGroups()
      .then(({err, data}) => {
        err ? setResponseError(err) : setFetchedValues(data);
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

  const onAddFacultyStudent = useCallback(
    (payload: IFetchAddFacultyStudentPayload) => {
      setRefreshing(true);
      fetchAddFacultyStudent(payload)
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
    onAddFacultyStudent({faculty: selectedFaculties[0], studentUsername: username});
  };
  const onClearSelectedValue = (_picker: IPicker): void => {
    isPickerFaculty(_picker) ? setSelectedFaculties([]) : setSelectedGroups([]);
  };
  const onPresPicker = (_picker: IPicker): void => {
    setPicker(_picker);
    onShowModalPicker();
  };

  useEffect(() => {
    responseError !== '' && onShowModalError();
  }, [responseError, onShowModalError]);

  const App = (
    <AddFacultyStudentView<IPicker>
      onClearSelectedValue={onClearSelectedValue}
      username={username}
      onChangeUsername={setUsername}
      refresh={{refreshing, onRefresh}}
      selectedFaculties={selectedFaculties}
      selectedGroups={selectedGroups}
      onPressPicker={onPresPicker}
      onPressAdd={onPressAdd}
    />
  );

  const [ShowMenu, onShowMenu] = useMenuDrawer({children: App, navigator});

  return (
    <>
      {ShowMenu}
      <Header onPressBack={onBack} onPressMenu={onShowMenu} SubHeader={<Text>Додати студента</Text>} />
      {ModalError}
      {ModalPicker}
    </>
  );
};

export default AddFacultyStudent;
