import React from 'react';
import {View} from 'react-native';
import VirtualList, {IRenderItem} from '@common-components/virtual-list';
import UserItem from '@components/user-item';
import getAdd from '@assets/svg-ts/add';
import useSvgFactory from '@hooks/use-svg-factory';
import {ISvgFactoryParams} from 'types/common';
import Touchable from '@common-components/touchable';
import UniversityPreview from '@components/university-preview';
import {ITeachers, ITeacher} from 'types/teacher';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {styles, myBottom} from './styles';

declare interface IViewProps {
  preview: string;
  name: string;
  onPressDelete: (teacher: ITeacher) => void;
  onPressAddFacultyTeacher: () => void;
  onPress: (teacher: ITeacher) => void;
  teachers: ITeachers;
  refresh: {refreshing: boolean; onRefresh: () => void};
}

const addParams: ISvgFactoryParams = {
  fillAccent: ACCENT_COLOR_BLUE,
  fillSecondary: '#CFCDDB',
  width: 50,
  height: 50,
};

const FacultyTeachersView = ({
  teachers,
  preview,
  name,
  onPressDelete,
  onPress,
  onPressAddFacultyTeacher,
  refresh,
}: IViewProps) => {
  const AddSvg = useSvgFactory(getAdd, addParams);

  const renderItem = ({item}: IRenderItem<ITeacher>) => (
    <View style={styles.item}>
      <UserItem
        textColor={ACCENT_COLOR_BLUE}
        mode="full"
        userRole=""
        onPressDeleteUser={() => {
          onPressDelete(item);
        }}
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
    <>
      <View style={[styles.item, myBottom]}>
        <UniversityPreview preview={preview} name={name} />
      </View>
      <View style={[styles.item]}>
        <Touchable onPress={onPressAddFacultyTeacher} Child={AddSvg} />
      </View>
    </>
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

export default FacultyTeachersView;
