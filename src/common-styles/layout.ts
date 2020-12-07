import {StyleSheet} from 'react-native';
import {DEFAULT_INDENT} from '@constants/indent';

export const styles = StyleSheet.create({
  centerXY: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  col: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  mx0: {marginLeft: 0, marginRight: 0},
  myTop: {marginTop: DEFAULT_INDENT},
  myBottom: {marginBottom: DEFAULT_INDENT},
  row: {
    marginRight: DEFAULT_INDENT,
    marginLeft: DEFAULT_INDENT,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  right: {alignItems: 'flex-end'},
  left: {alignItems: 'flex-start'},
});
