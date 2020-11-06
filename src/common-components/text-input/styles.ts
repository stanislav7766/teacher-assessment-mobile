import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {ACCENT_COLOR_BLUE, ACCENT_COLOR_RED} from '@constants/colors';

type BorderColorType = {
  borderColor: string;
};

type Styles = {
  container: ViewStyle;
  input: ViewStyle;
  placeholder: TextStyle;
  error: TextStyle;
};

const textBase: TextStyle = {
  fontWeight: 'bold',
  fontSize: 18,
  color: ACCENT_COLOR_BLUE,
};
export const inputDefaultSize = {
  width: '100%',
  height: 50,
};

export const styles = StyleSheet.create<Styles>({
  container: {
    width: inputDefaultSize.width,
  },
  input: {
    ...textBase,
    paddingLeft: 20,
    height: inputDefaultSize.height,
    borderWidth: 2,
    borderRadius: 10,
  },
  placeholder: {
    ...textBase,
    fontSize: 18,
    right: 0,
    color: ACCENT_COLOR_BLUE,
  },
  error: {
    ...textBase,
    fontSize: 14,
    color: ACCENT_COLOR_RED,
  },
});

export const getBorderColor = (errExist: boolean): BorderColorType => ({
  borderColor: errExist ? ACCENT_COLOR_RED : ACCENT_COLOR_BLUE,
});
