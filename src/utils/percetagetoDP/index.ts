import {PixelRatio} from 'react-native';
import {WIDTH_SCREEN, HEIGHT_SCREEN} from '@constants/dimesions';

export const widthPercentageToDP = (percentage: number) =>
  PixelRatio.roundToNearestPixel((WIDTH_SCREEN * percentage) / 100);
export const heightPercentageToDP = (percentage: number) =>
  PixelRatio.roundToNearestPixel((HEIGHT_SCREEN * percentage) / 100);
