import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {DEFAULT_INDENT} from '@constants/indent';
import {ACCENT_COLOR_BLUE} from '@constants/colors';

export const styles = StyleSheet.create({
  body: {},
  wrap: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

type Styles = {
  drawer: ViewStyle;
  textColor: TextStyle;
};
export const drawerStyles = StyleSheet.create<Styles>({
  drawer: {flex: 1, paddingTop: DEFAULT_INDENT, alignItems: 'center', backgroundColor: ACCENT_COLOR_BLUE},
  textColor: {color: 'white'},
});
