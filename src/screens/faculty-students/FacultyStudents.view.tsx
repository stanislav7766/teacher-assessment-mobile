import React from 'react';
import {View} from 'react-native';
import VirtualList, {IRenderItem} from '@common-components/virtual-list';
import UserItem from '@components/user-item';
import getAdd from '@assets/svg-ts/add';
import useSvgFactory from '@hooks/use-svg-factory';
import {ISvgFactoryParams} from 'types/common';
import Touchable from '@common-components/touchable';
import UniversityPreview from '@components/university-preview';
import {IStudents, IStudent} from 'types/student';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {styles, myBottom, footer} from './styles';

declare interface IViewProps {
  preview: string;
  name: string;
  onPressDelete: (student: IStudent) => void;
  onPressAddFacultyStudent: () => void;
  students: IStudents;
  refresh: {refreshing: boolean; onRefresh: () => void};
}

const addParams: ISvgFactoryParams = {
  fillAccent: ACCENT_COLOR_BLUE,
  fillSecondary: '#CFCDDB',
  width: 50,
  height: 50,
};

const FacultyStudentsView = ({
  students,
  preview,
  name,
  onPressDelete,
  onPressAddFacultyStudent,
  refresh,
}: IViewProps) => {
  const AddSvg = useSvgFactory(getAdd, addParams);

  const renderItem = ({item}: IRenderItem<IStudent>) => (
    <View style={styles.item}>
      <UserItem
        textColor={ACCENT_COLOR_BLUE}
        mode="full"
        userRole=""
        onPressDeleteUser={() => {
          onPressDelete(item);
        }}
        avatar={item.avatar}
        username={item.username}
      />
    </View>
  );

  const Footer = <View style={footer} />;
  const Header = (
    <>
      <View style={[styles.item, myBottom]}>
        <UniversityPreview preview={preview} name={name} />
      </View>
      <View style={[styles.item]}>
        <Touchable onPress={onPressAddFacultyStudent} Child={AddSvg} />
      </View>
    </>
  );

  return (
    <VirtualList<IStudent>
      refresh={refresh}
      containerStyle={styles.container}
      renderItem={renderItem}
      Footer={Footer}
      Header={Header}
      items={students}
      initialNumToRender={5}
      keyExtractor={item => item.id}
    />
  );
};

export default FacultyStudentsView;
