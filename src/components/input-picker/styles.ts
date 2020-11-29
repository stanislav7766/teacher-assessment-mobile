import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {ACCENT_COLOR_BLUE, ACCENT_COLOR_RED} from '@constants/colors';
import {styles as layoutStyles} from '@common-styles/layout';

const {row, mx0} = layoutStyles;

const textBase: TextStyle = {
  fontWeight: 'bold',
  fontSize: 18,
  color: ACCENT_COLOR_BLUE,
};

type Styles = {
  container: ViewStyle;
  input: TextStyle;
  inputContainer: ViewStyle;
  placeholder: TextStyle;
  clearContainer: ViewStyle;
  clearWrap: ViewStyle;
  error: TextStyle;
  inputScroll: ViewStyle;
  centerY: ViewStyle;
};
export const inputDefaultSize = {
  width: '100%',
  height: 50,
};

export const styles = StyleSheet.create<Styles>({
  container: {width: inputDefaultSize.width},
  inputContainer: {borderWidth: 2, borderRadius: 10},
  centerY: {flex: 1, alignItems: 'center', flexDirection: 'row'},
  input: {
    ...textBase,
    textAlignVertical: 'center',
    minWidth: 100,
    height: inputDefaultSize.height,
  },
  inputScroll: {marginLeft: 20},
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
  clearContainer: {position: 'absolute', width: '100%', height: '100%', justifyContent: 'center'},
  clearWrap: {...row, ...mx0, marginRight: 10, alignSelf: 'flex-end'},
});

export const getClearContainer = (height: number): ViewStyle => ({
  ...styles.clearContainer,
  height,
  top: height / 2,
});

type BorderColorType = {
  borderColor: string;
};

export const getBorderColor = (errExist: boolean): BorderColorType => ({
  borderColor: errExist ? ACCENT_COLOR_RED : ACCENT_COLOR_BLUE,
});
