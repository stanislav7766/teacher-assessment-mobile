import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {styles as layoutStyles} from '@common-styles/layout';

const {centerXY} = layoutStyles;

type Styles = {
  windowTextWrap: ViewStyle;
  pickerText: TextStyle;
  windowText: TextStyle;
};

export const styles = StyleSheet.create<Styles>({
  pickerText: {color: ACCENT_COLOR_BLUE},
  windowText: {color: ACCENT_COLOR_BLUE, textAlign: 'center', fontWeight: 'normal', fontSize: 18},
  windowTextWrap: {minHeight: 100, ...centerXY},
});

export const pickerSizes: {width: number; height: number; itemHeight: number} = {
  width: 100,
  height: 200,
  itemHeight: 40,
};
