import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {styles as layoutStyles} from '@common-styles/layout';
import {ACCENT_COLOR_BLUE} from '@constants/colors';

export const {row, col, mx0} = layoutStyles;

type Styles = {
  container: ViewStyle;
  label: TextStyle;
};

export const styles = StyleSheet.create<Styles>({
  container: {...row, ...mx0},
  label: {
    fontSize: 14,
    color: ACCENT_COLOR_BLUE,
    textAlign: 'center',
  },
});
