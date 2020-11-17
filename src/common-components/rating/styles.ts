import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {ISize} from 'types/common';

type Styles = {
  container: ViewStyle;
  star: ViewStyle;
};

export const getPointStyles = (color: string): TextStyle => ({
  fontWeight: 'bold',
  fontSize: 18,
  marginRight: 5,
  alignSelf: 'center',
  color,
});

export const starSize: ISize = {
  width: 20,
  height: 20,
};

export const styles = StyleSheet.create<Styles>({
  star: {alignSelf: 'center'},
  container: {
    flexDirection: 'row',
  },
});
