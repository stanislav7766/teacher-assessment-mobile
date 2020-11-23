/* eslint-disable global-require */
import React from 'react';
import {View, Image, Text} from 'react-native';
import Rating from '@common-components/rating';
import {mapNextLineFirst} from '@utils/map-text';
import {styles, getAvatarStyle, getFlexValues} from './styles';

const AssessmentHeader = ({mode, textColor, rating, avatar, username, height}: IAssessmentHeaderProps) => {
  const isTeacherRating = mode === 'teacher-rating';
  const isRating = mode === 'rating';

  if (isRating) {
    return (
      <View style={styles.rowWrap}>
        <View style={styles.right}>
          <Rating textColor={textColor} point={Number(rating)} />
        </View>
      </View>
    );
  }
  const renderUsername = mapNextLineFirst(username as string);
  const avatarStyles = getAvatarStyle(height);
  const Avatar = <Image style={avatarStyles} source={avatar ? {uri: avatar} : require('@assets/avatar.png')} />;

  const {flexAvatar, flexRating, flexUsername} = getFlexValues(mode);

  return (
    <View style={[styles.rowWrap, {height}]}>
      <View style={styles.left}>
        <View style={styles.rowWrap}>
          <View style={[styles.avatar, flexAvatar]}>{Avatar}</View>
          <View style={[styles.username, flexUsername]}>
            <Text style={styles.usernameText}>{renderUsername}</Text>
          </View>
        </View>
      </View>
      {isTeacherRating && (
        <View style={[styles.right, flexRating]}>
          <Rating textColor={textColor} point={rating as number} />
        </View>
      )}
    </View>
  );
};

AssessmentHeader.defaultProps = {
  username: undefined,
  avatar: undefined,
  rating: undefined,
};

interface IAssessmentHeaderProps {
  mode: 'teacher' | 'rating' | 'teacher-rating';
  username?: string;
  avatar?: string;
  rating?: number;
  height: number;
  textColor: string;
}

export default AssessmentHeader;
