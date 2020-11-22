import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {styles as stylesLayout} from '@common-styles/layout';
import {DEFAULT_INDENT} from '@constants/indent';
import {ACCENT_COLOR_BLUE} from '@constants/colors';

export const {col, row, right, left, mx0} = stylesLayout;

type Styles = {
  reviewText: TextStyle;
  review: ViewStyle;
  ownReview: ViewStyle;
  ownReviewText: TextStyle;
  qa: ViewStyle;
  qText: TextStyle;
  itemQuestion: ViewStyle;
  itemAnswer: ViewStyle;
  input: ViewStyle;
  rowWrap: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  rowWrap: {...row, ...mx0},
  itemQuestion: {...col, ...left},
  itemAnswer: {...col, ...right, top: -5, flex: 0.5},
  ownReview: {...mx0, marginTop: DEFAULT_INDENT / 2, alignSelf: 'flex-start'},
  qa: {...mx0, marginTop: DEFAULT_INDENT / 2},
  qText: {
    fontSize: 15,
    color: ACCENT_COLOR_BLUE,
  },
  reviewText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: ACCENT_COLOR_BLUE,
  },
  ownReviewText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
  },
  review: {...mx0, marginTop: 5},
  input: {height: 120},
});
