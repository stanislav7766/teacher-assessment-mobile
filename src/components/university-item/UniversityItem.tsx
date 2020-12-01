import React, {memo} from 'react';
import {View} from 'react-native';
import Rating from '@common-components/rating';
import UniversityPreview from '@components/university-preview';
import Touchable from '@common-components/touchable';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {styles, previewSize} from './styles';

const UniversityItem = ({rating, name, preview, onPress}: IUniversityItemProps) => {
  const Preview = (
    <View style={styles.preview}>
      <UniversityPreview size={previewSize} name={name} preview={preview} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Touchable withFeedback={false} Child={Preview} onPress={onPress} />
      <View style={styles.rating}>
        <Rating textColor={ACCENT_COLOR_BLUE} point={rating} />
      </View>
    </View>
  );
};

declare interface IUniversityItemProps {
  rating: number;
  name: string;
  preview: string;
  onPress: () => void;
}

export default memo(UniversityItem);
