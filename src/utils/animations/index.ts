import {Animated} from 'react-native';

export const runParalel = (animations: Array<Animated.CompositeAnimation>, cb?: () => void): void => {
  Animated.parallel(animations).start(() => {
    cb && cb();
  });
};
