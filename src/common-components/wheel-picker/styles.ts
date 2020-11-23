import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type Styles = {
  container: ViewStyle;
  selectedItem: ViewStyle;
  textStyle: TextStyle;
  highlightStyle: ViewStyle;
  offsetStyle: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  container: {flex: 0, overflow: 'hidden', justifyContent: 'center', alignSelf: 'center'},
  selectedItem: {justifyContent: 'center', alignItems: 'center', height: 40},
  textStyle: {fontSize: 20, lineHeight: 26, textAlign: 'center', color: '#000'},
  highlightStyle: {
    position: 'absolute',
    width: '100%',
    borderTopColor: '#CFCDDB',
    borderBottomColor: '#CFCDDB',
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  offsetStyle: {flex: 1},
});
