import {widthPercentageToDP as wp} from '@utils/percetagetoDP';
import {isTablet} from '@utils/isTablet';

export const HEIGHT_SPLASH: number = wp(10);
export const WIDTH_SPLASH: number = wp(80);
export const WIDTH_LOGO: number = isTablet() ? 300 : wp(50);
export const HEIGHT_LOGO: number = isTablet() ? 300 : wp(50);
