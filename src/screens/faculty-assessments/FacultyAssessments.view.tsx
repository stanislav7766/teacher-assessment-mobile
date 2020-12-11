import React from 'react';
import {View, Text} from 'react-native';
import getAdd from '@assets/svg-ts/add';
import useSvgFactory from '@hooks/use-svg-factory';
import {ISvgFactoryParams} from 'types/common';
import Touchable from '@common-components/touchable';
import VirtualList, {IRenderItem} from '@common-components/virtual-list';
import UserItem from '@components/user-item';
import UniversityPreview from '@components/university-preview';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {IGeneratedReviews, IGeneratedReview} from 'types/review';
import {styles, myBottom} from './styles';

declare interface IViewProps {
  preview: string;
  name: string;
  onPressDelete: (review: IGeneratedReview) => void;
  onPressAddReview: () => void;
  reviews: IGeneratedReviews;
  refresh: {refreshing: boolean; onRefresh: () => void};
}

const addParams: ISvgFactoryParams = {
  fillAccent: ACCENT_COLOR_BLUE,
  fillSecondary: '#CFCDDB',
  width: 50,
  height: 50,
};

const FacultyAssessmentsView = ({reviews, preview, name, onPressDelete, onPressAddReview, refresh}: IViewProps) => {
  const AddSvg = useSvgFactory(getAdd, addParams);

  const renderItem = ({item}: IRenderItem<IGeneratedReview>) => (
    <>
      <View style={styles.item}>
        <UserItem
          textColor={ACCENT_COLOR_BLUE}
          mode="full"
          userRole=""
          onPressDeleteUser={() => {
            onPressDelete(item);
          }}
          rating={item.rating}
          avatar={item.avatar}
          username={item.username}
        />
      </View>
      <View style={styles.underline}>
        <Text style={styles.groups}>{item.groups.join(', ')}</Text>
      </View>
    </>
  );

  const Footer = <View style={myBottom} />;
  const Header = (
    <>
      <View style={[styles.item]}>
        <UniversityPreview preview={preview} name={name} />
      </View>
      <View style={[styles.item]}>
        <Touchable onPress={onPressAddReview} Child={AddSvg} />
      </View>
    </>
  );

  return (
    <VirtualList<IGeneratedReview>
      refresh={refresh}
      containerStyle={styles.container}
      renderItem={renderItem}
      Footer={Footer}
      Header={Header}
      items={reviews}
      initialNumToRender={5}
      keyExtractor={item => item.id}
    />
  );
};

export default FacultyAssessmentsView;
