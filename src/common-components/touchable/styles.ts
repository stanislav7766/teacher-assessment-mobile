import {StyleSheet, ViewStyle} from 'react-native';

type Styles = {
  touchable: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
