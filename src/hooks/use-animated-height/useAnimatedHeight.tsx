//eslint propblem incompatible with ts version
import {useRef, useMemo} from 'react';
import {Animated} from 'react-native';

declare interface IParams {
  minHeight: number;
  maxHeight: number;
}

const useAnimatedHeight = ({
  minHeight,
  maxHeight,
}: IParams): [Animated.AnimatedInterpolation, (toValue: number) => Animated.CompositeAnimation] => {
  const anim = useRef(new Animated.Value(minHeight));

  const interpolatedAnim = useMemo(
    () =>
      anim.current.interpolate({
        inputRange: [0, 1],
        outputRange: [minHeight, maxHeight],
      }),
    [minHeight, maxHeight],
  );

  const compositeAnimation = (toValue: number): Animated.CompositeAnimation =>
    Animated.timing(anim.current, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    });

  return [interpolatedAnim, compositeAnimation];
};

export default useAnimatedHeight;
