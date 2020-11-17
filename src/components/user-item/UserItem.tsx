import React, {ReactNode, useState, useMemo} from 'react';
import {View, Image, Text, LayoutChangeEvent} from 'react-native';
import Rating from '@common-components/rating';
import defaultAvatar from '@assets/avatar.png';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {mapUsername} from '@utils/map-username';
import {styles, col, row, right, centerXY, getAvatarStyle, getUsernameStyle, deleteUserPosition} from './styles';

const UserItem = ({Btn, DeleteUser, rating, username, avatar, textColor, mode, userRole}: IUserItemProps) => {
  const isFullMode = mode === 'full';
  const isRating = rating !== undefined;

  const [avatarWidth, setAvatarWidth] = useState(0);
  const avatarFlexStyle = {flex: isFullMode ? 0.3 : 0.7};
  const avatarStyles = useMemo(() => getAvatarStyle(avatarWidth), [avatarWidth]);
  const usernameStyles = useMemo(() => getUsernameStyle(String(textColor)), [textColor]);

  const Avatar = <Image style={avatarStyles} source={avatar ? {uri: avatar} : defaultAvatar} />;
  const Rate = isRating && <Rating textColor={textColor} point={Number(rating)} />;
  const Username = <Text style={usernameStyles}>{mapUsername(username)}</Text>;

  const AvatarView = (
    <>
      {Avatar}
      {!isFullMode && <Text style={{color: textColor}}>{userRole}</Text>}
    </>
  );

  const TopRow = (
    <View style={[row, styles.topRow]}>
      {isFullMode ? (
        <>
          <View style={[col, styles.rating]}>{Rate}</View>
          <View style={[col, styles.deleteUser, !isRating && deleteUserPosition]}>{DeleteUser}</View>
        </>
      ) : (
        <View style={[col, right]}>{Rate}</View>
      )}
    </View>
  );

  const BottomRow = (
    <View style={[row, styles.bottomRow, !isRating && centerXY]}>
      {isFullMode ? (
        <>
          <View style={[col, styles.usernameWrap]}>{Username}</View>
          <View style={[col, styles.btn]}>{Btn}</View>
        </>
      ) : (
        <View style={[col]}>{Username}</View>
      )}
    </View>
  );

  const onLayoutAvatar = (event: LayoutChangeEvent): void => {
    const {width} = event.nativeEvent.layout;
    setAvatarWidth(width);
  };

  return (
    <View style={[row, styles.container]}>
      <View onLayout={onLayoutAvatar} style={[col, styles.avatar, avatarFlexStyle]}>
        {AvatarView}
      </View>
      <View style={[col, {height: avatarWidth}]}>
        {TopRow}
        {BottomRow}
      </View>
    </View>
  );
};

UserItem.defaultProps = {
  Btn: undefined,
  DeleteUser: undefined,
  rating: undefined,
  avatar: undefined,
  textColor: ACCENT_COLOR_BLUE,
};

declare interface IUserItemProps {
  Btn?: ReactNode;
  DeleteUser?: ReactNode;
  rating?: number;
  username: string;
  avatar?: string;
  textColor?: string;
  mode: Mode;
  userRole: string;
}
type Mode = 'full' | 'partial';

export default UserItem;
