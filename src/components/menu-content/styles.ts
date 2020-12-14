import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {styles as layoutStyles} from '@common-styles/layout';
import {screensStyles} from '@common-styles/screens';

export const {row, col, myTop, left, myBottom, mx0} = layoutStyles;
const {footer} = screensStyles;

type Styles = {
  drawer: ViewStyle;
  textColor: TextStyle;
  user: ViewStyle;
  separator: ViewStyle;
  bottom: ViewStyle;
  links: ViewStyle;
  linksWrap: ViewStyle;
  link: ViewStyle;
  footer: ViewStyle;
  logout: TextStyle;
};
export const styles = StyleSheet.create<Styles>({
  drawer: {flex: 1, alignItems: 'center', backgroundColor: ACCENT_COLOR_BLUE},
  textColor: {color: 'white'},
  user: {...row, ...myTop},
  link: {...row, ...mx0, marginBottom: 5},
  links: {...row, ...myTop, alignSelf: 'flex-start'},
  linksWrap: {...col, ...left},
  separator: {...row, ...myTop, width: '90%', borderBottomColor: '#fff', borderBottomWidth: 2},
  bottom: {position: 'absolute', bottom: 0, right: 0, left: 0},
  footer: {...row, justifyContent: 'flex-end', ...footer},
  logout: {fontWeight: 'bold', fontSize: 16, color: '#fff'},
});
