import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {styles as layoutStyles} from '@common-styles/layout';
import {screensStyles} from '@common-styles/screens';
import {ACCENT_COLOR_BLUE} from '@constants/colors';

export const {row, myBottom, myTop} = layoutStyles;
const {container} = screensStyles;

type Styles = {
  container: ViewStyle;
  item: ViewStyle;
  faculties: TextStyle;
  underline: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  container: {...container},
  item: {...row, ...myTop},
  faculties: {
    fontWeight: 'bold',
    fontSize: 16,
    color: ACCENT_COLOR_BLUE,
  },
  underline: {
    ...row,
    width: '90%',
    justifyContent: 'flex-start',
    borderBottomColor: ACCENT_COLOR_BLUE,
    borderBottomWidth: 2,
    ...myTop,
  },
});
