import {StyleSheet} from 'react-native';
import {DEFAULT_INDENT} from '@constants/indent';

export const styles = StyleSheet.create({
  centerXY: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  col: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  row: {
    marginRight: DEFAULT_INDENT,
    marginLeft: DEFAULT_INDENT,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
