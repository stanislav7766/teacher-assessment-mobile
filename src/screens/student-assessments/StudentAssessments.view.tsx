import React from 'react';
import {View} from 'react-native';
import VirtualList, {IRenderItem} from '@common-components/virtual-list';
import ViewAssessment from '@components/view-assessment';
import UserItem from '@components/user-item';
import Section from '@components/section';
import {IActiveReview, IActiveReviews, ILeavedReview, ILeavedReviews} from 'types/review';
import {randomID} from '@utils/random-id';
import {styles, footer} from './styles';

declare interface IViewProps {
  onPressActiveReview: (activeReview: IActiveReview) => void;
  activeReviews: IActiveReviews;
  leavedReviews: ILeavedReviews;
  refresh: {refreshing: boolean; onRefresh: () => void};
}

const StudentAssessmentsView = ({leavedReviews, activeReviews, refresh, onPressActiveReview}: IViewProps) => {
  const renderActiveReview = ({item}: IRenderItem<IActiveReview>) => (
    <View style={styles.item}>
      <UserItem
        btnTitle={`Залишити\nвідгук`}
        onPressBtn={() => {
          onPressActiveReview(item);
        }}
        mode="full"
        userRole=""
        username={item.username}
        avatar={item.avatar}
      />
    </View>
  );
  const renderLeavedReview = ({item}: IRenderItem<ILeavedReview>) => (
    <View style={styles.item}>
      <ViewAssessment
        withTeacher
        rating={item.rating}
        review={item.review}
        avatar={item.avatar}
        username={item.username}
        QAs={item.QAs}
      />
    </View>
  );
  const HeaderLeavedReviews = (
    <View style={styles.section}>
      <Section text="Залишені відгуки" />
    </View>
  );
  const Header = (
    <View style={styles.section}>
      <Section text="Активні відгуки" />
    </View>
  );
  const Footer = <View style={footer} />;

  const LeavedReviews = (
    <VirtualList<ILeavedReview>
      containerStyle={styles.leavedReviews}
      renderItem={renderLeavedReview}
      Header={HeaderLeavedReviews}
      Footer={Footer}
      items={leavedReviews}
      initialNumToRender={5}
      keyExtractor={item => item.id}
      refresh={refresh}
    />
  );

  return (
    <VirtualList<IActiveReview>
      containerStyle={styles.container}
      renderItem={renderActiveReview}
      Header={Header}
      Footer={LeavedReviews}
      items={activeReviews}
      initialNumToRender={5}
      keyExtractor={item => item.id ?? randomID()}
      refresh={refresh}
    />
  );
};

export default StudentAssessmentsView;
