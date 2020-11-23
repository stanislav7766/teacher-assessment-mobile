import React, {useEffect, useRef} from 'react';
import {View, Text, ScrollView, TextStyle, ViewStyle} from 'react-native';
import {randomID} from '@utils/random-id';
import {styles} from './styles';

type Item = {label: string; value: string};
const findIndex = (arr: Array<Item>, val: string) => arr.findIndex(obj => obj.value === val);

declare interface IWheelPickerProps {
  items: Array<Item>;
  selectedValue: string;
  onValueChange: (value: string) => void;
  textStyle?: TextStyle;
  highlightStyle?: ViewStyle;
  sizes: {
    width: number;
    height: number;
    itemHeight: number;
  };
  backgroundColor?: string;
}

const WheelPicker = ({
  items,
  sizes,
  selectedValue,
  textStyle,
  highlightStyle,
  backgroundColor,
  onValueChange,
}: IWheelPickerProps) => {
  const {width, height, itemHeight} = sizes;
  const scrollViewRef = useRef<ScrollView | null>(null);
  const offsetTop = (height - itemHeight) / 2;
  const offsetHeight = (height * 0.8 - itemHeight) / 2;

  const scrollToValue = (val: string): void => {
    const ind: number = findIndex(items, val);
    const y: number = itemHeight * ind;
    setTimeout(() => {
      scrollViewRef?.current?.scrollTo({y, animated: false});
    }, 1);
  };

  useEffect(() => {
    selectedValue && scrollToValue(selectedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Offset = <View style={[styles.offsetStyle, {height: offsetHeight}]} />;

  const renderItems = () =>
    items.map((item: Item) => (
      <View key={randomID()} style={[styles.selectedItem, {height: itemHeight}]}>
        <Text style={[styles.textStyle, textStyle]}>{item.label}</Text>
      </View>
    ));

  const scrollFix = (e: {nativeEvent: {contentOffset: {y: number}}}) => {
    const verticalY: number = e.nativeEvent.contentOffset.y;
    const selectedIndex: number = Math.round(verticalY / itemHeight);
    const verticalElem: number = selectedIndex * itemHeight;

    verticalElem !== verticalY &&
      scrollViewRef?.current?.scrollTo({
        y: verticalElem,
        animated: true,
      });
    const {value}: Item = items[selectedIndex];
    selectedValue !== value && onValueChange(value);
  };
  const onMomentumScrollEnd = (e: {nativeEvent: {contentOffset: {y: number}}}) => scrollFix(e);

  return (
    <View style={[styles.container, {backgroundColor, width, height}]}>
      <View style={[styles.highlightStyle, {top: offsetTop, height: itemHeight}, highlightStyle]} />
      <ScrollView
        style={{maxHeight: height * 0.8}}
        ref={ref => {
          scrollViewRef.current = ref;
        }}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
      >
        {Offset}
        {renderItems()}
        {Offset}
      </ScrollView>
    </View>
  );
};

WheelPicker.defaultProps = {
  textStyle: {},
  highlightStyle: {},
  backgroundColor: '#fff',
};

export default WheelPicker;
