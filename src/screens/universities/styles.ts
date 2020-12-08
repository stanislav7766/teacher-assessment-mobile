import {StyleSheet, ViewStyle} from 'react-native';
import {styles as layoutStyles} from '@common-styles/layout';
import {screensStyles} from '@common-styles/screens';

export const {row, myBottom, myTop} = layoutStyles;
const {container} = screensStyles;

type Styles = {
  container: ViewStyle;
  item: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  container: {...container},
  item: {...row, ...myTop},
});
