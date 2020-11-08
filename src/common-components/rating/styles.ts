import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {ISize} from 'types/common';

type Styles = {
  point: TextStyle;
  container: ViewStyle;
  star: ViewStyle;
};

export const starSize: ISize = {
  width: 20,
  height: 20,
};

export const styles = StyleSheet.create<Styles>({
  star: {alignSelf: 'center'},
  point: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 5,
    alignSelf: 'center',
    color: ACCENT_COLOR_BLUE,
  },
  container: {
    flexDirection: 'row',
  },
});
