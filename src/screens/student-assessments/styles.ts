import {StyleSheet, ViewStyle} from 'react-native';
import {styles as layoutStyles} from '@common-styles/layout';
import {screensStyles} from '@common-styles/screens';
import {DEFAULT_INDENT} from '@constants/indent';

export const {row, myBottom, myTop} = layoutStyles;
const {container} = screensStyles;

type Styles = {
  container: ViewStyle;
  leavedReviews: ViewStyle;
  item: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  container: {...container},
  item: {...row, ...myTop},
  leavedReviews: {marginTop: DEFAULT_INDENT * 2, minHeight: 100},
});
