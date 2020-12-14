import {widthPercentageToDP as wp} from '@utils/percetagetoDP';
import {isTablet, WIDTH_TABLET, WIDTH_SCREEN} from '@utils/isTablet';

export const DEFAULT_INDENT: number = wp(isTablet() ? 3 : 5);

const w: number = wp(100) - DEFAULT_INDENT * 2;
export const itemWidth: number = WIDTH_SCREEN <= WIDTH_TABLET - 50 ? w : WIDTH_TABLET - 50;
