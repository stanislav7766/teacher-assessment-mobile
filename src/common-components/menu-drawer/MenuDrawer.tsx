import React, {useCallback, useState, useEffect, useMemo, useRef} from 'react';
import {
  Animated,
  Dimensions,
  View,
  SafeAreaView,
  Platform,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import {
  IConfigOptions,
  IConfigOutput,
  IMenuDrawerProps,
  IPlatformContainerProps,
  IAnimatedOptions,
  Position,
} from './types';
import {styles} from './styles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const isIOS = Platform.OS === 'ios';

const isTap = (dx: number, dy: number) => Math.abs(dx) < 1 || Math.abs(dy) < 1;
const isAllowedSwipe = (dx: number): boolean => Math.abs(dx) >= 0.5 * SCREEN_WIDTH;
const isVerticalSwipe = (dx: number, dy: number): boolean => dx === 0 || Math.abs(dy) >= Math.abs(dx);

const getConfigLeft = ({drawerWidth, paddingGesture, open}: IConfigOptions): IConfigOutput => {
  const opened: number = drawerWidth;
  const closed: number = 0;

  return {
    opened,
    closed,
    inPaddingGestureBounds: (offset: number): boolean => !open && offset >= closed && offset <= paddingGesture,
    inBounds: (offset: number): boolean => offset >= paddingGesture && offset <= opened,
    needOpenOrClose: (offset: number): boolean => {
      const needShowMenu = offset > 0 ? 'open' : 'close';
      return needShowMenu === 'open';
    },
    calcOffset: (dx: number, moveX: number): number => (open ? opened + dx : moveX),
    calcOpacity: (dx: number, opacity: number): number => (Math.abs(dx) / opened) * opacity,
  };
};

const getConfigRight = ({drawerWidth, paddingGesture, open}: IConfigOptions): IConfigOutput => {
  const opened: number = SCREEN_WIDTH;
  const closed: number = SCREEN_WIDTH + drawerWidth;

  return {
    opened,
    closed,
    inPaddingGestureBounds: (offset: number): boolean => !open && offset >= opened - paddingGesture && offset <= opened,
    inBounds: (offset: number): boolean => offset <= closed - paddingGesture && offset >= opened,
    needOpenOrClose: (offset: number): boolean => {
      const needShowMenu = offset > 0 ? 'close' : 'open';
      return needShowMenu === 'open';
    },
    calcOffset: (dx: number, moveX: number): number => drawerWidth + (open ? dx : moveX),
    calcOpacity: (dx: number, opacity: number): number => (Math.abs(dx - closed) / drawerWidth) * opacity,
  };
};

const getConfig = (position: Position, options: IConfigOptions): IConfigOutput =>
  ({
    left: getConfigLeft(options),
    right: getConfigRight(options),
  }[position]);

const PlatformContainer = ({children}: IPlatformContainerProps) =>
  isIOS ? <SafeAreaView style={[styles.main]}>{children}</SafeAreaView> : <View style={styles.main}>{children}</View>;

const MenuDrawer = ({
  children,
  menuContent,
  open,
  menuWidth,
  animationTime,
  position,
  tapToClose,
  paddingGesture,
  opacity,
  backgroundColor,
  onPaddingGestureStart,
  onPaddingGestureEnd,
  onShowMenu,
}: IMenuDrawerProps) => {
  const DRAWER_WIDTH = menuWidth;
  const config = useMemo(
    () => getConfig(position, {open, paddingGesture, drawerWidth: DRAWER_WIDTH, screenWidth: SCREEN_WIDTH}),
    [DRAWER_WIDTH, open, paddingGesture, position],
  );
  const maskRef = useRef<View | null>(null);
  const [drawerOffset] = useState(new Animated.Value(open ? config.opened : config.closed));

  const updateNativeStyles = (dx: number): void => {
    const value = config.calcOpacity(dx, opacity);
    maskRef.current && maskRef.current.setNativeProps({backgroundColor, opacity: value >= opacity ? opacity : value});
  };
  const chooseOnPaddingGesture = (needDisablingScroll: 'enable' | 'disable') => {
    needDisablingScroll === 'disable' && onPaddingGestureStart && onPaddingGestureStart();
    needDisablingScroll === 'enable' && onPaddingGestureEnd && onPaddingGestureEnd();
  };

  useEffect(() => {
    drawerOffset.addListener(({value}) => {
      updateNativeStyles(value);
    });
    return () => {
      drawerOffset.removeAllListeners();
    };
  });

  const animateDrawer = (animated: Animated.Value, {toValue, duration, useNativeDriver}: IAnimatedOptions): void => {
    Animated.timing(animated, {
      toValue,
      duration,
      useNativeDriver,
    }).start();
  };

  const shouldContinueGestureStart = (): boolean => open;
  const shouldContinueGestureMove = (_: GestureResponderEvent, {dx, dy, moveX}: PanResponderGestureState): boolean =>
    !isVerticalSwipe(dx, dy) && config.inPaddingGestureBounds(moveX);

  const onPanResponderMove = (_: GestureResponderEvent, {dx, moveX}: PanResponderGestureState): void => {
    chooseOnPaddingGesture('disable');
    const newOffset = config.calcOffset(dx, moveX);
    config.inBounds(newOffset) && animateDrawer(drawerOffset, {toValue: newOffset, duration: 1, useNativeDriver: true});
    Animated.event([null, {dx: drawerOffset}], {useNativeDriver: true});
  };

  const onPanResponderRelease = (_: GestureResponderEvent, {dx, dy}: PanResponderGestureState): void => {
    if (isTap(dx, dy)) {
      tapToClose && onShowMenu(false);
      tapToClose && chooseOnPaddingGesture('enable');
      return;
    }

    if (isAllowedSwipe(dx)) {
      const needOpen = config.needOpenOrClose(dx);
      onShowMenu(needOpen);
      chooseOnPaddingGesture(needOpen ? 'disable' : 'enable');
      return;
    }
    chooseOnPaddingGesture(open ? 'disable' : 'enable');
    const newOffset = open ? config.opened : config.closed;
    animateDrawer(drawerOffset, {toValue: newOffset, duration: animationTime, useNativeDriver: true});
  };
  const onStartShouldSetPanResponder = () => shouldContinueGestureStart();
  const onStartShouldSetPanResponderCapture = () => shouldContinueGestureStart();
  const onMoveShouldSetPanResponderCapture = (e: GestureResponderEvent, g: PanResponderGestureState) =>
    shouldContinueGestureMove(e, g);
  const onMoveShouldSetPanResponder = (e: GestureResponderEvent, g: PanResponderGestureState) =>
    shouldContinueGestureMove(e, g);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponderCapture,
        onStartShouldSetPanResponder,
        onMoveShouldSetPanResponderCapture,
        onMoveShouldSetPanResponder,
        onPanResponderMove,
        onPanResponderRelease,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open],
  );

  const openDrawer = useCallback(() => {
    animateDrawer(drawerOffset, {toValue: config.opened, duration: animationTime, useNativeDriver: true});
  }, [config.opened, animationTime, drawerOffset]);

  const closeDrawer = useCallback(() => {
    animateDrawer(drawerOffset, {toValue: config.closed, duration: animationTime, useNativeDriver: true});
  }, [config.closed, animationTime, drawerOffset]);

  useEffect(() => {
    open ? openDrawer() : closeDrawer();
  }, [open, openDrawer, closeDrawer]);

  const App = (
    <>
      <Animated.View {...panResponder.panHandlers}>
        <Animated.View
          style={[styles.drawer, {width: DRAWER_WIDTH, left: -DRAWER_WIDTH, transform: [{translateX: drawerOffset}]}]}
        >
          {menuContent}
        </Animated.View>
        <Animated.View style={[styles.container]}>
          <View
            style={[styles.mask]}
            ref={ref => {
              maskRef.current = ref;
            }}
          />

          {children}
        </Animated.View>
      </Animated.View>
    </>
  );

  return <PlatformContainer>{App}</PlatformContainer>;
};

MenuDrawer.defaultProps = {
  onPaddingGestureStart: undefined,
  onPaddingGestureEnd: undefined,
};

export default MenuDrawer;
