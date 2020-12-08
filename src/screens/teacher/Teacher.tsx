import React, {useState, useEffect, useCallback} from 'react';
import {Text} from 'react-native';
import useMenuDrawer from '@hooks/use-menu-drawer';
import Header from '@components/header';
import {EasyRouterNavigator} from 'react-native-easy-router';
import {ITeacher} from 'types/teacher';
import useError from '@hooks/use-error';
import {useModalHeader as useModalError} from '@hooks/use-window-modal';
import {IReviews} from 'types/review';
import {observer} from 'mobx-react-lite';
import {useUser} from '@stores/user';
import {STUDENT} from '@constants/roles';
import {fetchReviews} from '@api/review';
import {ERROR_OCCURRED} from '@constants/errors';
import TeacherView from './Teacher.view';

declare interface ITeachersProps {
  navigator: EasyRouterNavigator;
  teacher: ITeacher;
}
const Teacher = ({navigator, teacher}: ITeachersProps) => {
  const [reviews, setReviews] = useState<IReviews>([]);
  const [refreshing, setRefreshing] = useState(true);
  const [responseError, setResponseError, clearResponseError] = useError();
  const [ModalError, onShowModalError] = useModalError({
    text: responseError,
    onClose: clearResponseError,
    preset: 'close',
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchReviews()
      .then(({err, data}) => {
        err ? setResponseError(err) : setReviews(data);
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

  const {user} = useUser();
  const isAllowLeaveReview = user.role === STUDENT;

  const onLeaveReview = (): void => {
    navigator.push('LeaveReview', {teacher}, {animation: 'fade'});
  };

  const onBack = (): void => {
    navigator.pop({animation: 'fade'});
  };

  useEffect(() => {
    responseError !== '' && onShowModalError();
  }, [responseError, onShowModalError]);

  const App = (
    <TeacherView
      refresh={{refreshing, onRefresh}}
      allowBtn={isAllowLeaveReview}
      username={teacher.username}
      avatar={teacher.avatar}
      rating={teacher.rating}
      reviews={reviews}
      onLeaveReview={onLeaveReview}
    />
  );

  const [ShowMenu, onShowMenu] = useMenuDrawer({children: App, navigator});

  return (
    <>
      {ShowMenu}
      <Header onPressBack={onBack} onPressMenu={onShowMenu} SubHeader={<Text>Викладач</Text>} />
      {ModalError}
    </>
  );
};

export default observer(Teacher);
