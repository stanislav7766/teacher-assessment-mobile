import {StyleSheet} from 'react-native';
import {WIDTH_LOGO, HEIGHT_LOGO} from '@constants/splash';
import {DEFAULT_INDENT} from '@constants/indent';

export const styles = StyleSheet.create({
  logo: {
    margin: DEFAULT_INDENT,
  },
  logoImage: {
    width: WIDTH_LOGO,
    height: HEIGHT_LOGO,
  },
});
