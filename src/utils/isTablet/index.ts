import {WIDTH_SCREEN} from '@constants/dimesions';

export {WIDTH_SCREEN};
export const WIDTH_TABLET: number = 500;
export const isTablet = (): boolean => WIDTH_SCREEN >= WIDTH_TABLET;
