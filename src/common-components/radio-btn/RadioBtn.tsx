import React, {useRef, useEffect} from 'react';
import {TouchableOpacity, GestureResponderEvent, Animated} from 'react-native';
import {styles, getCircleStyles} from './styles';

const RadioBtn = ({size, isSelected, onPress}: IRadioBtnProps) => {
  const animOpacity = useRef(new Animated.Value(0)).current;
  const {circleStyle, checkedCircleStyle} = getCircleStyles(size);

  useEffect(() => {
    Animated.timing(animOpacity, {
      useNativeDriver: true,
      toValue: isSelected ? 1 : 0,
      duration: 250,
    }).start();
  }, [animOpacity, isSelected]);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.circle, circleStyle]}>
      <Animated.View style={[styles.checkedCircle, checkedCircleStyle, {opacity: animOpacity}]} />
    </TouchableOpacity>
  );
};

export default RadioBtn;

export interface IRadioBtnProps {
  size: number;
  isSelected: boolean;
  onPress: (event: GestureResponderEvent) => void;
}
