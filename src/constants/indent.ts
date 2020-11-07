import {widthPercentageToDP as wp} from '@utils/percetagetoDP';
import {isTablet} from '@utils/isTablet';

export const DEFAULT_INDENT: number = wp(isTablet() ? 10 : 5);
