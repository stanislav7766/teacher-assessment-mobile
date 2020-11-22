import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {styles as stylesLayout} from '@common-styles/layout';
import {DEFAULT_INDENT} from '@constants/indent';
import {ACCENT_COLOR_BLUE, ACCENT_COLOR_RED} from '@constants/colors';

export const {col, row, right, left, mx0} = stylesLayout;

type Styles = {
  reviewText: TextStyle;
  review: ViewStyle;
  collapse: TextStyle;
  reviewWrap: ViewStyle;
  hidden: ViewStyle;
  toggle: ViewStyle;
  qa: ViewStyle;
  qaItems: ViewStyle;
  itemWrap: ViewStyle;
  itemQuestion: ViewStyle;
  itemAnswer: ViewStyle;
  itemUnderline: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  itemQuestion: {...col, ...left},
  itemUnderline: {...row, ...mx0, borderBottomColor: ACCENT_COLOR_BLUE, borderBottomWidth: 2, bottom: 5},
  itemAnswer: {...col, ...right, flex: 0.2},
  itemWrap: {...row, ...mx0, marginTop: 5, marginBottom: 5},
  qa: {...mx0, marginTop: DEFAULT_INDENT / 2},
  qaItems: {marginBottom: DEFAULT_INDENT / 2},
  hidden: {position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, opacity: 0},
  reviewText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: ACCENT_COLOR_BLUE,
  },
  review: {position: 'absolute', left: 0, right: 0, bottom: 0, ...mx0, marginTop: DEFAULT_INDENT / 2},
  collapse: {
    fontWeight: 'bold',
    fontSize: 15,
    color: ACCENT_COLOR_RED,
  },
  toggle: {...col, ...right},
  reviewWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export const getQAOpacity = (isExpanded: boolean): {opacity: 1 | 0} => ({opacity: isExpanded ? 1 : 0});
