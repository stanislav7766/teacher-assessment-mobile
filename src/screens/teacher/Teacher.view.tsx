import React from 'react';
import {View} from 'react-native';
import UserItem from '@components/user-item';
import {IReviews, IReview} from 'types/review';
import VirtualList, {IRenderItem} from '@common-components/virtual-list';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import ViewAssessment from '@components/view-assessment';
import {styles, myBottom} from './styles';

declare interface IViewProps {
  avatar?: string;
  username: string;
  allowBtn: boolean;
  rating: number;
  onLeaveReview: () => void;
  reviews: IReviews;
  refresh: {refreshing: boolean; onRefresh: () => void};
}

const TeacherView = ({rating, reviews, avatar, allowBtn, username, refresh, onLeaveReview}: IViewProps) => {
  const withBtnProps = allowBtn ? {btnTitle: `Залишити\nвідгук`, onPressBtn: onLeaveReview} : {};

  const renderItem = ({item}: IRenderItem<IReview>) => (
    <View style={styles.item}>
      <ViewAssessment withTeacher={false} rating={item.rating} review={item.review} QAs={item.QAs} />
    </View>
  );

  const Header = (
    <View style={[styles.item, myBottom]}>
      <UserItem
        textColor={ACCENT_COLOR_BLUE}
        mode="full"
        userRole=""
        {...withBtnProps}
        rating={rating}
        avatar={avatar}
        username={username}
      />
    </View>
  );
  const Footer = <View style={myBottom} />;
  return (
    <VirtualList<IReview>
      containerStyle={styles.container}
      Footer={Footer}
      Header={Header}
      renderItem={renderItem}
      items={reviews}
      initialNumToRender={5}
      keyExtractor={item => item.id}
      refresh={refresh}
    />
  );
};

TeacherView.defaultProps = {
  avatar: undefined,
};

export default TeacherView;
