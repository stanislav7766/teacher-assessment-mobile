import {StyleSheet, ViewStyle} from 'react-native';
import {ACCENT_COLOR_BLUE} from '@constants/colors';

type Styles = {
  circle: ViewStyle;
  checkedCircle: ViewStyle;
};

declare interface ICircleStyles {
  circleStyle: ViewStyle;
  checkedCircleStyle: ViewStyle;
}

export const getCircleStyles = (size: number): ICircleStyles => ({
  circleStyle: {
    width: size,
    height: size,
    borderRadius: size / 2,
  },
  checkedCircleStyle: {
    width: size * 0.5,
    height: size * 0.5,
    borderRadius: (size * 0.5) / 2,
  },
});

export const styles = StyleSheet.create<Styles>({
  circle: {
    borderWidth: 1,
    borderColor: ACCENT_COLOR_BLUE,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    backgroundColor: ACCENT_COLOR_BLUE,
  },
});
