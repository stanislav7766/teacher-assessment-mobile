import React, {useState, useEffect, useCallback} from 'react';
import {Text} from 'react-native';
import useMenuDrawer from '@hooks/use-menu-drawer';
import Header from '@components/header';
import {EasyRouterNavigator} from 'react-native-easy-router';
import {ITeacher} from 'types/teacher';
import useError from '@hooks/use-error';
import {useModalHeader as useModalError} from '@hooks/use-window-modal';
import {IActiveReview, IReviews} from 'types/review';
import {observer} from 'mobx-react-lite';
import {useUser} from '@stores/user';
import {STUDENT} from '@constants/roles';
import {fetchTeacherRating} from '@api/teacher';
import {fetchReviews, fetchActiveReview} from '@api/review';
import {ERROR_OCCURRED} from '@constants/errors';
import TeacherView from './Teacher.view';

declare interface ITeacherProps {
  navigator: EasyRouterNavigator;
  teacher: ITeacher;
}
const Teacher = ({navigator, teacher}: ITeacherProps) => {
  const [reviews, setReviews] = useState<IReviews>([]);
  const [refreshing, setRefreshing] = useState(true);
  const [rating, setRating] = useState<number>(teacher.rating);
  const [responseError, setResponseError, clearResponseError] = useError();
  const [ModalError, onShowModalError] = useModalError({
    text: responseError,
    onClose: clearResponseError,
    preset: 'close',
  });

  const {id: teacherId} = teacher;

  const onTeacherRating = useCallback(() => {
    rating === undefined &&
      fetchTeacherRating({teacherId})
        .then(({err, data}) => {
          !err && setRating(data);
        })
        .catch(_err => {
          setResponseError(ERROR_OCCURRED);
        });
  }, [rating, setResponseError, teacherId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    onTeacherRating();
    fetchReviews({teacherId})
      .then(({err, data}) => {
        err ? setResponseError(err) : setReviews(data);
      })
      .catch(_ => {
        setResponseError(ERROR_OCCURRED);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, [onTeacherRating, setResponseError, teacherId]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const {user} = useUser();
  const isAllowLeaveReview = user.role === STUDENT;

  const toLeaveAssessment = useCallback(
    (activeReview: IActiveReview): void => {
      navigator.push('LeaveAssessment', {activeReview}, {animation: 'fade'});
    },
    [navigator],
  );

  const onActiveReview = useCallback(() => {
    setRefreshing(true);
    fetchActiveReview({teacherId})
      .then(({err, data}) => {
        err ? setResponseError(err) : toLeaveAssessment(data[0]);
      })
      .catch(_ => {
        setResponseError(ERROR_OCCURRED);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, [setResponseError, teacherId, toLeaveAssessment]);

  const onLeaveReview = (): void => {
    onActiveReview();
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
      rating={rating}
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
