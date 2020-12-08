import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {styles as layoutStyles} from '@common-styles/layout';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {DEFAULT_INDENT} from '@constants/indent';

export const {row} = layoutStyles;

type Styles = {
  section: ViewStyle;
  sectionText: TextStyle;
};

export const styles = StyleSheet.create<Styles>({
  sectionText: {
    fontWeight: 'normal',
    fontSize: 16,
    color: ACCENT_COLOR_BLUE,
    paddingLeft: DEFAULT_INDENT,
    paddingRight: DEFAULT_INDENT,
  },
  section: {...row, alignSelf: 'flex-start', borderBottomColor: ACCENT_COLOR_BLUE, borderBottomWidth: 1},
});
