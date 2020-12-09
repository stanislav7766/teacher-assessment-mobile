import React, {useState, useEffect, useCallback} from 'react';
import {Text} from 'react-native';
import useError from '@hooks/use-error';
import useMenuDrawer from '@hooks/use-menu-drawer';
import {useModalHeader as useModalError} from '@hooks/use-window-modal';
import Header from '@components/header';
import {EasyRouterNavigator} from 'react-native-easy-router';
import {fetchLeaveReview} from '@api/review';
import {IFetchLeaveReviewPayload} from '@api/review/types';
import {useUser} from '@stores/user';
import {observer} from 'mobx-react-lite';
import {IActiveReview, IQAs} from 'types/review';
import {ERROR_OCCURRED} from '@constants/errors';
import {randomID} from '@utils/random-id';
import LeaveAssessmentView from './LeaveAssessment.view';

declare interface IUniversitiesProps {
  navigator: EasyRouterNavigator;
  activeReview: IActiveReview;
}
const Universities = ({navigator, activeReview}: IUniversitiesProps) => {
  const mapQAs = useCallback((): IQAs => activeReview.QAs.map(qa => ({...qa, answer: 0, id: randomID()})), [
    activeReview.QAs,
  ]);
  const [QAs, setQAs] = useState(mapQAs());
  const [review, setReview] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [responseError, setResponseError, clearResponseError] = useError();
  const [ModalError, onShowModalError] = useModalError({
    text: responseError,
    onClose: clearResponseError,
    preset: 'close',
  });

  const onChangeQAs = useCallback((No: number, answer: number) => {
    setQAs(old => {
      const index = old.findIndex(val => val.No === No);
      const copy = [...old];
      copy[index].answer = answer;
      return copy;
    });
  }, []);

  const onBack = useCallback((): void => {
    navigator.pop({animation: 'fade'});
  }, [navigator]);

  const onRefresh = useCallback((): void => {
    setReview('');
    setQAs(mapQAs());
  }, [mapQAs]);

  const {user} = useUser();
  const {id: userId} = user;
  const {id: activeReviewId} = activeReview;

  const onLeaveReview = useCallback(
    (payload: IFetchLeaveReviewPayload) => {
      setRefreshing(true);
      fetchLeaveReview(payload)
        .then(({err}) => {
          if (err) {
            setResponseError(err);
            return;
          }
          onRefresh();
          onBack();
        })
        .catch(_ => {
          setResponseError(ERROR_OCCURRED);
        })
        .finally(() => {
          setRefreshing(false);
        });
    },
    [setResponseError, onBack, onRefresh],
  );

  const onPressLeaveReview = (): void => {
    onLeaveReview({review, QAs, userId, activeReviewId});
  };

  useEffect(() => {
    responseError !== '' && onShowModalError();
  }, [responseError, onShowModalError]);

  const App = (
    <LeaveAssessmentView
      refresh={{refreshing, onRefresh}}
      onPressLeaveReview={onPressLeaveReview}
      username={activeReview.username}
      avatar={activeReview.avatar}
      QAs={QAs}
      review={review}
      updateQAs={onChangeQAs}
      updateReview={setReview}
    />
  );
  const [ShowMenu, onShowMenu] = useMenuDrawer({children: App, navigator});

  return (
    <>
      {ShowMenu}
      <Header onPressBack={onBack} onPressMenu={onShowMenu} SubHeader={<Text>Залишити відгук</Text>} />
      {ModalError}
    </>
  );
};

export default observer(Universities);
