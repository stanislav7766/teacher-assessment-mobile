import {StyleSheet, ViewStyle} from 'react-native';
import {styles as stylesLayout} from '@common-styles/layout';

export const {col, row, left, right} = stylesLayout;

type Styles = {
  header: ViewStyle;
  container: ViewStyle;
  subHeader: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  header: {
    width: '100%',
    justifyContent: 'center',
    flex: 1,
  },
  subHeader: {alignSelf: 'center', position: 'absolute'},
  container: {position: 'absolute', top: 0},
});
