/* eslint-disable global-require */
import React, {useState, useMemo, memo} from 'react';
import {View, Image, Text, LayoutChangeEvent} from 'react-native';
import Rating from '@common-components/rating';
import Btn from 'common-components/btn';
import useSvgFactory from '@hooks/use-svg-factory';
import getBin from '@assets/svg-ts/trash-bin';
import Touchable from '@common-components/touchable';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {mapNextLine} from '@utils/map-text';
import {IOnPress, ISvgFactoryParams} from 'types/common';
import {
  styles,
  col,
  row,
  right,
  centerXY,
  getAvatarStyle,
  getUsernameStyle,
  deleteUserPosition,
  btnWidth,
} from './styles';

const binParams: ISvgFactoryParams = {
  fillAccent: ACCENT_COLOR_BLUE,
  width: 15,
  height: 15,
};

const UserItem = ({
  btnTitle,
  onPressBtn,
  onPressDeleteUser,
  rating,
  username,
  avatar,
  textColor,
  mode,
  userRole,
}: IUserItemProps) => {
  const isFullMode = mode === 'full';
  const isRating = rating !== undefined;
  const isUserBtn = btnTitle !== undefined && onPressBtn !== undefined;
  const isDeleteUser = onPressDeleteUser !== undefined;

  const [avatarWidth, setAvatarWidth] = useState(0);
  const avatarFlexStyle = {flex: isFullMode ? 0.3 : 0.7};
  const avatarStyles = useMemo(() => getAvatarStyle(avatarWidth), [avatarWidth]);
  const usernameStyles = useMemo(() => getUsernameStyle(textColor as string), [textColor]);

  const Avatar = <Image style={avatarStyles} source={avatar ? {uri: avatar} : require('@assets/avatar.png')} />;
  const Rate = isRating && <Rating textColor={textColor} point={rating as number} />;
  const Username = <Text style={usernameStyles}>{mapNextLine(username)}</Text>;
  const BinSvg = useSvgFactory(getBin, binParams);
  const DeleteUser = isDeleteUser && <Touchable Child={BinSvg} onPress={onPressDeleteUser as IOnPress} />;

  const UserBtn = isUserBtn && (
    <Btn onPress={onPressBtn as IOnPress} height={40} width={btnWidth} title={btnTitle as string} />
  );

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
          <View style={[col, styles.btn]}>{UserBtn}</View>
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
  onPressBtn: undefined,
  btnTitle: undefined,
  onPressDeleteUser: undefined,
  rating: undefined,
  avatar: undefined,
  textColor: ACCENT_COLOR_BLUE,
};

declare interface IUserItemProps {
  onPressBtn?: () => void;
  btnTitle?: string;
  onPressDeleteUser?: () => void;
  rating?: number;
  username: string;
  avatar?: string;
  textColor?: string;
  mode: Mode;
  userRole: string;
}
type Mode = 'full' | 'partial';

const propsEqual = (prevProps: IUserItemProps, nextProps: IUserItemProps) =>
  JSON.stringify(prevProps) === JSON.stringify(nextProps);
export default memo(UserItem, propsEqual);
