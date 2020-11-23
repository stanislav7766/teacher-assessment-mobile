import {StyleSheet, ViewStyle} from 'react-native';
import {styles as layoutStyles} from '@common-styles/layout';

export const {centerXY, row, mx0, col, right, left} = layoutStyles;

type Styles = {
  container: ViewStyle;
  checkWrap: ViewStyle;
  bottom: ViewStyle;
  children: ViewStyle;
  mask: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  children: {...row, ...mx0},
  bottom: {...row, ...mx0},
  mask: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  checkWrap: {position: 'absolute', zIndex: 100, top: 10, right: 10},
});
