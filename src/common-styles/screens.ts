import {DEFAULT_INDENT, itemWidth} from '@constants/indent';
import {StyleSheet, ViewStyle} from 'react-native';

type Styles = {
  container: ViewStyle;
  footer: ViewStyle;
  item: ViewStyle;
};

export const screensStyles = StyleSheet.create<Styles>({
  container: {marginTop: 50 + DEFAULT_INDENT, minHeight: 100},
  item: {alignSelf: 'center', width: itemWidth},
  footer: {marginBottom: 50},
});
