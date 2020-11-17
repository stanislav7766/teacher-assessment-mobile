import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {styles as stylesLayout} from '@common-styles/layout';

import {DEFAULT_INDENT} from '@constants/indent';

export const {col, row, right, left, mx0, centerXY} = stylesLayout;

declare interface IAvatarStyle {
  width: number;
  height: number;
  borderRadius: number;
}

export const getAvatarStyle = (size: number): IAvatarStyle => ({
  width: size,
  height: size,
  borderRadius: size * 0.5,
});

export const deleteUserPosition: ViewStyle = {position: 'absolute', right: 0, top: 0};

export const getUsernameStyle = (color: string): TextStyle => ({
  fontWeight: 'bold',
  fontSize: 15,
  color,
});

type Styles = {
  usernameWrap: ViewStyle;
  rating: ViewStyle;
  bottomRow: ViewStyle;
  topRow: ViewStyle;
  deleteUser: ViewStyle;
  btn: ViewStyle;
  container: ViewStyle;
  avatar: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  usernameWrap: {...left},
  rating: {...right, marginRight: DEFAULT_INDENT},
  topRow: {...mx0},
  bottomRow: {...mx0, marginLeft: DEFAULT_INDENT},
  deleteUser: {...right, alignSelf: 'center'},
  btn: {...right, alignSelf: 'flex-end'},
  container: {...mx0, width: '100%'},
  avatar: {...left, alignItems: 'center'},
});
