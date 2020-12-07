import {ReactNode} from 'react';

export type Position = 'left' | 'right';

export declare interface IMenuDrawerProps {
  open: boolean;
  tapToClose: boolean;
  paddingGesture: number;
  menuWidth: number;
  animationTime: number;
  position: Position;
  children: ReactNode;
  menuContent: JSX.Element;
  opacity: number;
  backgroundColor: string;
  onShowMenu: (show: boolean) => void;
}
export declare interface IPlatformContainerProps {
  children: ReactNode;
}
export declare interface IConfigOptions {
  paddingGesture: number;
  drawerWidth: number;
  screenWidth: number;
  open: boolean;
}
export declare interface IConfigOutput {
  opened: number;
  closed: number;
  inBounds: (offset: number) => boolean;
  inDrawerBounds: (offser: number) => boolean;
  needOpenOrClose: (offset: number) => boolean;
  inPaddingGestureBounds: (offset: number) => boolean;
  calcOffset: (dx: number, moveX: number) => number;
  calcOpacity: (dx: number, opacity: number) => number;
}
export declare interface IAnimatedOptions {
  useNativeDriver: boolean;
  duration: number;
  toValue: number;
}
