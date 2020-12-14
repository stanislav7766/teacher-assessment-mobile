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
import {ILocalAdmin, ILocalAdmins} from 'types/local-admin';
import {styles, footer} from './styles';

declare interface IViewProps {
  preview: string;
  name: string;
  onPressDelete: (localAdmin: ILocalAdmin) => void;
  onPressAddLocalAdmin: () => void;
  localAdmins: ILocalAdmins;
  refresh: {refreshing: boolean; onRefresh: () => void};
}

const addParams: ISvgFactoryParams = {
  fillAccent: ACCENT_COLOR_BLUE,
  fillSecondary: '#CFCDDB',
  width: 50,
  height: 50,
};

const LocalAdminsView = ({localAdmins, preview, name, onPressDelete, onPressAddLocalAdmin, refresh}: IViewProps) => {
  const AddSvg = useSvgFactory(getAdd, addParams);

  const renderItem = ({item}: IRenderItem<ILocalAdmin>) => (
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
        <Text style={styles.faculties}>{item.faculties.join(' ,')}</Text>
      </View>
    </>
  );

  const Footer = <View style={footer} />;
  const Header = (
    <>
      <View style={[styles.item]}>
        <UniversityPreview preview={preview} name={name} />
      </View>
      <View style={[styles.item]}>
        <Touchable onPress={onPressAddLocalAdmin} Child={AddSvg} />
      </View>
    </>
  );

  return (
    <VirtualList<ILocalAdmin>
      refresh={refresh}
      containerStyle={styles.container}
      renderItem={renderItem}
      Footer={Footer}
      Header={Header}
      items={localAdmins}
      initialNumToRender={5}
      keyExtractor={item => item.id}
    />
  );
};

export default LocalAdminsView;
