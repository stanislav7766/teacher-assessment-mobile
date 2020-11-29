import {StyleSheet, TextStyle} from 'react-native';
import {ACCENT_COLOR_BLUE} from '@constants/colors';

type Styles = {
  pickerText: TextStyle;
};

export const styles = StyleSheet.create<Styles>({
  pickerText: {color: ACCENT_COLOR_BLUE},
});

export const pickerSizes: {width: number; height: number; itemHeight: number} = {
  width: 100,
  height: 200,
  itemHeight: 40,
};
