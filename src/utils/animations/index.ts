import {Animated} from 'react-native';

export const runParalel = (animations: Array<Animated.CompositeAnimation>): void => {
  Animated.parallel(animations).start();
};
