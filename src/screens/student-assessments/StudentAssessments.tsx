import React, {useState, useEffect, useCallback} from 'react';
import {Text} from 'react-native';
import useMenuDrawer from '@hooks/use-menu-drawer';
import Header from '@components/header';
import useError from '@hooks/use-error';
import {EasyRouterNavigator} from 'react-native-easy-router';
import {useModalHeader as useModalError} from '@hooks/use-window-modal';
import {IActiveReview, IActiveReviews, ILeavedReviews} from 'types/review';
import {fetchStudentReviews} from '@api/review';
import {ERROR_OCCURRED} from '@constants/errors';
import StudentAssessmentsView from './StudentAssessments.view';

declare interface IStudentAssessmentsProps {
  navigator: EasyRouterNavigator;
}
const StudentAssessments = ({navigator}: IStudentAssessmentsProps) => {
  const [activeReviews, setActiveReviews] = useState<IActiveReviews>([]);
  const [leavedReviews, setLeavedReviews] = useState<ILeavedReviews>([]);
  const [refreshing, setRefreshing] = useState(true);
  const [responseError, setResponseError, clearResponseError] = useError();
  const [ModalError, onShowModalError] = useModalError({
    text: responseError,
    onClose: clearResponseError,
    preset: 'close',
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchStudentReviews()
      .then(({err, data}) => {
        if (err) {
          setResponseError(err);
          return;
        }
        setActiveReviews(data.active);
        setLeavedReviews(data.leaved);
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

  const onActiveReview = (activeReview: IActiveReview): void => {
    navigator.push('LeaveAssessment', {activeReview}, {animation: 'fade'});
  };
  const onBack = (): void => {
    navigator.pop({animation: 'fade'});
  };

  const App = (
    <StudentAssessmentsView
      refresh={{refreshing, onRefresh}}
      activeReviews={activeReviews}
      leavedReviews={leavedReviews}
      onPressActiveReview={onActiveReview}
    />
  );
  const [ShowMenu, onShowMenu] = useMenuDrawer({navigator, children: App});

  useEffect(() => {
    responseError !== '' && onShowModalError();
  }, [responseError, onShowModalError]);

  return (
    <>
      {ShowMenu}
      <Header onPressBack={onBack} onPressMenu={onShowMenu} SubHeader={<Text>Ваші відгуки</Text>} />
      {ModalError}
    </>
  );
};

export default StudentAssessments;
