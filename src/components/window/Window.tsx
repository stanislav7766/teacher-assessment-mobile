import React, {useEffect, ReactNode} from 'react';
import {TouchableOpacity, View, Animated} from 'react-native';
import useSvgFactory from '@hooks/use-svg-factory';
import {ISvgFactoryParams} from 'types/common';
import Form from '@common-components/form';
import Btn from '@common-components/btn';
import useAnimated from '@hooks/use-animated';
import getCheck from '@assets/svg-ts/check';
import getClose from '@assets/svg-ts/close';
import {ACCENT_COLOR_BLUE, ACCENT_COLOR_RED} from '@constants/colors';
import {runParalel} from '@utils/animations';
import {styles, centerXY, col, left, right} from './styles';

const checkSvgParams: ISvgFactoryParams = {
  width: 33,
  height: 33,
  fillAccent: '#CFCDDB',
  fillSecondary: ACCENT_COLOR_BLUE,
};
const closeSvgParams: ISvgFactoryParams = {
  width: 20,
  height: 20,
  fillAccent: ACCENT_COLOR_RED,
};

type IBottom = 'bottom';
type IHeader = 'close' | 'check';

declare interface IWindowProps {
  children: ReactNode;
  backgroundColor: string;
  width: number;
  opacity: number;
  preset: 'check' | 'close' | 'bottom';
  closeWindow: () => void;
}

const Window = ({children, backgroundColor, opacity, width, preset, closeWindow}: IWindowProps) => {
  const [animMaskOpacity, compositeAnimationMask] = useAnimated({from: 0, to: opacity});
  const [animWindowOpacity, compositeAnimationWindow] = useAnimated({from: 0, to: 1});
  const isBottomPreset = preset === 'bottom';

  const close = (): void => {
    const toValue: number = 0;
    runParalel([compositeAnimationWindow({toValue, duration: 100}), compositeAnimationMask({toValue})], closeWindow);
  };

  const RenderBottom = (type: IBottom): JSX.Element =>
    ({
      bottom: (
        <>
          <View style={[col, left]}>
            <Btn onPress={close} width={60} height={30} title="Так" />
          </View>
          <View style={[col, right]}>
            <Btn backgroundColor={ACCENT_COLOR_RED} onPress={close} width={60} height={30} title="Ні" />
          </View>
        </>
      ),
    }[type]);

  const RenderHeader = (type: IHeader): JSX.Element =>
    ({
      check: useSvgFactory(getCheck, checkSvgParams),
      close: useSvgFactory(getClose, closeSvgParams),
    }[type]);

  useEffect(() => {
    const toValue: number = 1;
    runParalel([compositeAnimationWindow({toValue, duration: 100}), compositeAnimationMask({toValue})]);
  }, [compositeAnimationMask, compositeAnimationWindow]);

  return (
    <Animated.View style={[styles.container, {opacity: animWindowOpacity}]}>
      <Animated.View style={[styles.mask, {backgroundColor, opacity: animMaskOpacity}]} />
      <View style={centerXY}>
        <Form backgroundColor="#fff" width={width}>
          {!isBottomPreset && (
            <TouchableOpacity onPress={close} style={styles.checkWrap}>
              {RenderHeader(preset as IHeader)}
            </TouchableOpacity>
          )}
          <Animated.View style={[styles.children]}>{children}</Animated.View>
          {isBottomPreset && <View style={[styles.bottom]}>{RenderBottom(preset as IBottom)}</View>}
        </Form>
      </View>
    </Animated.View>
  );
};

export default Window;
