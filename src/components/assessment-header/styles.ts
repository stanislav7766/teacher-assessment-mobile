import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {styles as layoutStyles} from '@common-styles/layout';

export const {row, col, mx0, left, right} = layoutStyles;

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

type Styles = {
  usernameText: TextStyle;
  left: ViewStyle;
  rowWrap: ViewStyle;
  right: ViewStyle;
  avatar: ViewStyle;
  username: ViewStyle;
};

export const styles = StyleSheet.create<Styles>({
  usernameText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },
  username: {...col, ...right, alignItems: 'flex-start', alignSelf: 'center'},
  avatar: {...col, ...left},
  left: {...col, ...left},
  rowWrap: {...row, ...mx0},
  right: {...col, ...right, alignSelf: 'flex-end'},
});

type IOutputFlexes = {
  flexAvatar: {flex: number};
  flexUsername: {flex: number};
  flexRating: {flex: number};
};

const FLEX_AVATAR = 0.25;
const FLEX_RATING = 0.25;

export const getFlexValues = (mode: 'teacher-rating' | 'teacher' | 'rating'): IOutputFlexes => ({
  flexAvatar: {flex: FLEX_AVATAR},
  flexRating: {flex: FLEX_RATING},
  flexUsername: {flex: mode === 'teacher-rating' ? 1 - FLEX_AVATAR - FLEX_AVATAR : 1 - FLEX_AVATAR + FLEX_RATING},
});
