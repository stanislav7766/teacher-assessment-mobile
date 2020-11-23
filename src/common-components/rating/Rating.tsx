import React from 'react';
import {View, Text} from 'react-native';
import getStar from '@assets/svg-ts/star';
import useSvgFactory from '@hooks/use-svg-factory';
import {ISvgFactoryParams} from 'types/common';
import {STAR_ACCENT, STAR_SECONDARY, ACCENT_COLOR_BLUE} from '@constants/colors';
import {styles, starSize, getPointStyles} from './styles';

declare interface IRatingProps {
  point: number;
  textColor?: string;
}
const svgFactoryParams: ISvgFactoryParams = {
  ...starSize,
  fillAccent: STAR_ACCENT,
  fillSecondary: STAR_SECONDARY,
};

const Rating = ({point, textColor}: IRatingProps) => {
  const StarSvg = useSvgFactory(getStar, svgFactoryParams);
  const pointStyle = getPointStyles(textColor as string);
  return (
    <View style={styles.container}>
      <Text style={pointStyle}>{point}</Text>
      <View style={styles.star}>{StarSvg}</View>
    </View>
  );
};

Rating.defaultProps = {
  textColor: ACCENT_COLOR_BLUE,
};

export default Rating;
