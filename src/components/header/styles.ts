import {StyleSheet, ViewStyle, Platform} from 'react-native';
import {styles as stylesLayout} from '@common-styles/layout';

export const {col, row, left, right, mx0} = stylesLayout;

type Styles = {
  header: ViewStyle;
  container: ViewStyle;
  subHeader: ViewStyle;
};

const STATUSBAR_IOS_HEIGHT = 30;

export const styles = StyleSheet.create<Styles>({
  header: {
    width: '100%',
    justifyContent: 'center',
    flex: 1,
  },
  subHeader: {alignSelf: 'center', position: 'absolute'},
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? STATUSBAR_IOS_HEIGHT + 20 : 20,
  },
});
