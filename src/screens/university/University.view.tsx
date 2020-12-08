import React from 'react';
import {View} from 'react-native';
import VirtualList, {IRenderItem} from '@common-components/virtual-list';
import UserItem from '@components/user-item';
import UniversityPreview from '@components/university-preview';
import {ITeachers, ITeacher} from 'types/teacher';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {styles, myBottom} from './styles';

declare interface IViewProps {
  preview: string;
  name: string;
  onPress: (teacher: ITeacher) => void;
  teachers: ITeachers;
  refresh: {refreshing: boolean; onRefresh: () => void};
}

const UniversityView = ({teachers, preview, name, onPress, refresh}: IViewProps) => {
  const renderItem = ({item}: IRenderItem<ITeacher>) => (
    <View style={styles.item}>
      <UserItem
        textColor={ACCENT_COLOR_BLUE}
        mode="full"
        userRole=""
        btnTitle="Переглянути сторінку"
        onPressBtn={() => {
          onPress(item);
        }}
        rating={item.rating}
        avatar={item.avatar}
        username={item.username}
      />
    </View>
  );

  const Footer = <View style={myBottom} />;
  const Header = (
    <View style={[styles.item, myBottom]}>
      <UniversityPreview preview={preview} name={name} />
    </View>
  );

  return (
    <VirtualList<ITeacher>
      refresh={refresh}
      containerStyle={styles.container}
      renderItem={renderItem}
      Footer={Footer}
      Header={Header}
      items={teachers}
      initialNumToRender={5}
      keyExtractor={item => item.id}
    />
  );
};

export default UniversityView;
