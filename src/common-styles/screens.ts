import {DEFAULT_INDENT} from '@constants/indent';
import {StyleSheet, ViewStyle} from 'react-native';

type Styles = {
  container: ViewStyle;
  footer: ViewStyle;
};

export const screensStyles = StyleSheet.create<Styles>({
  container: {marginTop: 50 + DEFAULT_INDENT, minHeight: 100},
  footer: {marginBottom: 50},
});
