import {StyleSheet, ViewStyle} from 'react-native';
import {styles as stylesLayout} from '@common-styles/layout';
import {HEIGHT_SCREEN} from '@constants/dimesions';
import {screensStyles} from '@common-styles/screens';

const {row, myTop} = stylesLayout;
const {container} = screensStyles;
type Styles = {
  container: ViewStyle;
  scrollview: ViewStyle;
  btn: ViewStyle;
  input: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  container: {position: 'absolute', ...container, height: HEIGHT_SCREEN},
  scrollview: {flexGrow: 1, justifyContent: 'center', marginBottom: container.marginTop},
  btn: {...row, ...myTop},
  input: {...row},
});
