import {StyleSheet, ViewStyle} from 'react-native';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {DEFAULT_INDENT} from '@constants/indent';

type Styles = {
  form: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  form: {
    padding: DEFAULT_INDENT,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: ACCENT_COLOR_BLUE,
  },
});
