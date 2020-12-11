import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {Text} from 'react-native';
import {fetchGroups} from '@api/group';
import {fetchAddGeneratedReview} from '@api/review';
import {IFetchAddFacultyReviewPayload} from '@api/review/types';
import {IGroups} from 'types/group';
import useError from '@hooks/use-error';
import useMenuDrawer from '@hooks/use-menu-drawer';
import Header from '@components/header';
import {useModalHeader as useModalError, useModalPicker} from '@hooks/use-window-modal';
import {EasyRouterNavigator} from 'react-native-easy-router';
import {ERROR_OCCURRED} from '@constants/errors';
import AddFacultyAssessmentView from './AddFacultyAssessment.view';

interface IAddFacultyAssessmentProps {
  navigator: EasyRouterNavigator;
}

const AddFacultyAssessment = ({navigator}: IAddFacultyAssessmentProps) => {
  const [refreshing, setRefreshing] = useState(true);
  const [username, setUsername] = useState<string>('');
  const [groups, setGroups] = useState<IGroups>([]);
  const [selectedGroups, setSelectedGroups] = useState<IGroups>([]);
  const [responseError, setResponseError, clearResponseError] = useError();
  const [ModalError, onShowModalError] = useModalError({
    text: responseError,
    onClose: clearResponseError,
    preset: 'close',
  });

  const pickerItems = useMemo(() => groups.map(group => ({label: group, value: group})), [groups]);
  const [ModalPicker, onShowModalPicker] = useModalPicker({
    pickerItems,
    selectedItems: selectedGroups,
    setSelectedItems: setSelectedGroups,
    mode: 'multiple',
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchGroups()
      .then(({err, data}) => {
        err ? setResponseError(err) : setGroups(data);
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

  const onAddFacultyReview = useCallback(
    (payload: IFetchAddFacultyReviewPayload) => {
      setRefreshing(true);
      fetchAddGeneratedReview(payload)
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
    onAddFacultyReview({groups: selectedGroups, teacherUsername: username});
  };
  const onClearSelectedGroups = (): void => {
    setSelectedGroups([]);
  };

  useEffect(() => {
    responseError !== '' && onShowModalError();
  }, [responseError, onShowModalError]);

  const App = (
    <AddFacultyAssessmentView
      onClearSelectedGroups={onClearSelectedGroups}
      username={username}
      onChangeUsername={setUsername}
      refresh={{refreshing, onRefresh}}
      selectedGroups={selectedGroups}
      onPressPicker={onShowModalPicker}
      onPressAdd={onPressAdd}
    />
  );

  const [ShowMenu, onShowMenu] = useMenuDrawer({children: App, navigator});

  return (
    <>
      {ShowMenu}
      <Header onPressBack={onBack} onPressMenu={onShowMenu} SubHeader={<Text>Згенерувати опитування</Text>} />
      {ModalError}
      {ModalPicker}
    </>
  );
};

export default AddFacultyAssessment;
