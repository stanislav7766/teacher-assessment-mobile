import {StyleSheet, ViewStyle} from 'react-native';
import {styles as layoutStyles} from '@common-styles/layout';

const {row, mx0} = layoutStyles;

type Styles = {
  container: ViewStyle;
  preview: ViewStyle;
  rating: ViewStyle;
};
export const styles = StyleSheet.create<Styles>({
  container: {width: '100%'},
  preview: {...row, ...mx0, justifyContent: 'flex-start'},
  rating: {...row, ...mx0, justifyContent: 'flex-start'},
});

export const previewSize: {width: '100%'; height: number} = {
  width: '100%',
  height: 150,
};
