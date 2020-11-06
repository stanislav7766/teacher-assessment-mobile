import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {ACCENT_COLOR_BLUE, WHITE} from '@constants/colors';

type Styles = {
  container: ViewStyle;
  title: TextStyle;
};

const textBase: TextStyle = {
  fontWeight: 'bold',
  fontSize: 18,
  color: WHITE,
};
export const btnDefaultSize = {
  width: '100%',
  height: 50,
};

export const styles = StyleSheet.create<Styles>({
  container: {
    ...btnDefaultSize,
    backgroundColor: ACCENT_COLOR_BLUE,
    borderWidth: 2,
    borderColor: ACCENT_COLOR_BLUE,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...textBase,
  },
});
