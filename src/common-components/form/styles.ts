import {StyleSheet, ViewStyle} from 'react-native';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {DEFAULT_INDENT} from '@constants/indent';

type Styles = {
  form: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  form: {
    paddingRight: DEFAULT_INDENT,
    paddingLeft: DEFAULT_INDENT,
    paddingBottom: DEFAULT_INDENT / 2,
    paddingTop: DEFAULT_INDENT / 2,
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: ACCENT_COLOR_BLUE,
  },
});
