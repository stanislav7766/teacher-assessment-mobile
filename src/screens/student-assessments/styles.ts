import {StyleSheet, ViewStyle} from 'react-native';
import {styles as layoutStyles} from '@common-styles/layout';
import {screensStyles} from '@common-styles/screens';
import {DEFAULT_INDENT} from '@constants/indent';

export const {row, myBottom, myTop} = layoutStyles;
export const {container, footer, item} = screensStyles;

type Styles = {
  container: ViewStyle;
  leavedReviews: ViewStyle;
  item: ViewStyle;
  section: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  container: {...container},
  item: {...row, ...myTop, ...item},
  section: {...row, ...myTop, ...item, alignSelf: 'flex-start'},
  leavedReviews: {marginTop: DEFAULT_INDENT * 2, minHeight: 100},
});
