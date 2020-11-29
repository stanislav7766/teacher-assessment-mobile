import {useRef, useMemo} from 'react';
import {Animated} from 'react-native';

declare interface IParams {
  from: number;
  to: number;
}

const useAnimated = ({
  from,
  to,
}: IParams): [
  Animated.AnimatedInterpolation,
  (params: {toValue: number; duration?: number; useNativeDriver?: boolean}) => Animated.CompositeAnimation,
] => {
  const anim = useRef(new Animated.Value(from));
  const interpolatedAnim = useMemo(
    () =>
      anim.current.interpolate({
        inputRange: [0, 1],
        outputRange: [from, to],
      }),
    [from, to],
  );

  const compositeAnimation = (params: {
    toValue: number;
    duration?: number;
    useNativeDriver?: boolean;
  }): Animated.CompositeAnimation =>
    Animated.timing(anim.current, {
      toValue: params.toValue,
      duration: params.duration || 250,
      useNativeDriver: params.useNativeDriver || false,
    });

  return [interpolatedAnim, compositeAnimation];
};

export default useAnimated;
