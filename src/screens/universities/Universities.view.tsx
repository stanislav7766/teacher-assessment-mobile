import React from 'react';
import {View} from 'react-native';
import UniverityItem from '@components/university-item';
import VirtualList, {IRenderItem} from '@common-components/virtual-list';
import {IUniversities, IUniversity} from 'types/university';
import {styles, myBottom} from './styles';

declare interface IViewProps {
  onPress: (university: IUniversity) => void;
  universities: IUniversities;
  refresh: {refreshing: boolean; onRefresh: () => void};
}

const UniversitiesView = ({universities, refresh, onPress}: IViewProps) => {
  const renderItem = ({item}: IRenderItem<IUniversity>) => (
    <View style={styles.item}>
      <UniverityItem
        onPress={() => {
          onPress(item);
        }}
        rating={item.rating}
        preview={item.preview}
        name={item.name}
      />
    </View>
  );

  const Footer = <View style={myBottom} />;

  return (
    <VirtualList<IUniversity>
      containerStyle={styles.container}
      renderItem={renderItem}
      Footer={Footer}
      items={universities}
      initialNumToRender={5}
      keyExtractor={item => item.id}
      refresh={refresh}
    />
  );
};

export default UniversitiesView;
