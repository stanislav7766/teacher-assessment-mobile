import React from 'react';
import {View, Text} from 'react-native';
import getStar from '@assets/svg-ts/star';
import useSvgFactory from '@hooks/use-svg-factory';
import {ISvgFactoryParams} from 'types/common';
import {STAR_ACCENT, STAR_SECONDARY} from '@constants/colors';
import {styles, starSize} from './styles';

declare interface IRatingProps {
  point: number;
}
const svgFactoryParams: ISvgFactoryParams = {
  ...starSize,
  fillAccent: STAR_ACCENT,
  fillSecondary: STAR_SECONDARY,
};

const Rating = ({point}: IRatingProps) => {
  const StarSvg = useSvgFactory(getStar, svgFactoryParams);

  return (
    <View style={styles.container}>
      <Text style={styles.point}>{point}</Text>
      <View style={styles.star}>{StarSvg}</View>
    </View>
  );
};

export default Rating;
