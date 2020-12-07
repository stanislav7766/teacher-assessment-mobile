import {useRef} from 'react';
import {Animated} from 'react-native';

declare interface IParams {
  from: number;
  to: number;
}

const useAnimated = ({
  from,
  to,
}: IParams): [
  Animated.AnimatedValue,
  (params: {toValue: number; duration?: number; useNativeDriver?: boolean}) => Animated.CompositeAnimation,
] => {
  const anim = useRef(new Animated.Value(from));

  const compositeAnimation = (params: {
    toValue: number;
    duration?: number;
    useNativeDriver?: boolean;
  }): Animated.CompositeAnimation =>
    Animated.timing(anim.current, {
      toValue: params.toValue === 0 ? from : to,
      duration: params.duration || 250,
      useNativeDriver: params.useNativeDriver || false,
    });

  return [anim.current, compositeAnimation];
};

export default useAnimated;
