import {StyleSheet} from 'react-native';
import {WIDTH_SPLASH, HEIGHT_SPLASH} from '@constants/splash';

export const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  footer: {
    flex: 1,
    alignSelf: 'center',
    position: 'absolute',
    bottom: HEIGHT_SPLASH,
  },
  footerImage: {
    width: WIDTH_SPLASH,
    resizeMode: 'contain',
  },
});
