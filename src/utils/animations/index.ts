import {Animated} from 'react-native';

export const runParalel = (animations: Array<Animated.CompositeAnimation>, cb?: () => void): void => {
  Animated.parallel(animations).start(() => {
    cb && cb();
  });
};

export const runSequence = (animations: Array<Animated.CompositeAnimation>, cb?: () => void): void => {
  Animated.sequence(animations).start(() => {
    cb && cb();
  });
};

export const getParalel = (animations: Array<Animated.CompositeAnimation>): Animated.CompositeAnimation =>
  Animated.parallel(animations);

export const getSequance = (animations: Array<Animated.CompositeAnimation>): Animated.CompositeAnimation =>
  Animated.sequence(animations);
