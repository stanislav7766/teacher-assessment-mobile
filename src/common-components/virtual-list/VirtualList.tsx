import React from 'react';
import {ViewStyle, VirtualizedList} from 'react-native';

declare interface IVirtualListProps<Item> {
  containerStyle?: ViewStyle;
  renderItem: ({item}: {item: Item}) => JSX.Element;
  keyExtractor: (item: Item) => string;
  Header?: JSX.Element;
  Footer?: JSX.Element;
  scrollEnabled?: boolean;
  initialNumToRender: number;
  items: Array<Item>;
  refresh?: {refreshing: boolean; onRefresh: () => void};
}
export type IRenderItem<Item> = {item: Item};

const VirtualList = <Item,>({
  scrollEnabled,
  items,
  Footer,
  Header,
  containerStyle,
  initialNumToRender,
  renderItem,
  keyExtractor,
  refresh,
}: IVirtualListProps<Item>) => {
  const getItemCount = (_: any) => items.length;

  const getItem = (_: any, index: number) => items[index];

  return (
    <VirtualizedList
      style={containerStyle}
      scrollEnabled={scrollEnabled}
      nestedScrollEnabled
      ListHeaderComponent={Header}
      ListFooterComponent={Footer}
      data={[]}
      initialNumToRender={initialNumToRender}
      getItemCount={getItemCount}
      getItem={getItem}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      {...refresh}
    />
  );
};

VirtualList.defaultProps = {
  containerStyle: {},
  scrollEnabled: true,
  Header: null,
  Footer: null,
  refresh: {},
};

export default VirtualList;
