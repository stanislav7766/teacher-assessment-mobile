import React from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';
import FillAssessment from '@components/fill-assessment';
import Btn from 'common-components/btn';
import {IQAs} from 'types/review';
import {styles, myBottom, myTop, row} from './styles';

declare interface IViewProps {
  username: string;
  QAs: IQAs;
  avatar?: string;
  review: string;
  updateReview: (text: string) => void;
  updateQAs: (No: number, answer: number) => void;
  onPressLeaveReview: () => void;
  refresh: {refreshing: boolean; onRefresh: () => void};
}

const LeaveAssessmentView = ({
  onPressLeaveReview,
  avatar,
  username,
  review,
  QAs,
  updateQAs,
  refresh,
  updateReview,
}: IViewProps) => {
  const Footer = <View style={myBottom} />;
  return (
    <ScrollView refreshControl={<RefreshControl {...refresh} />} style={styles.container}>
      <View style={[row, myTop]}>
        <FillAssessment
          username={username}
          QAs={QAs}
          avatar={avatar}
          review={review}
          updateReview={updateReview}
          updateQAs={updateQAs}
        />
      </View>
      <View style={[row, myTop]}>
        <Btn onPress={onPressLeaveReview} title="Надіслати" />
      </View>
      {Footer}
    </ScrollView>
  );
};

LeaveAssessmentView.defaultProps = {
  avatar: undefined,
};

export default LeaveAssessmentView;
