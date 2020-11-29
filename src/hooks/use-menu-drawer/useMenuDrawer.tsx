import React, {useState, ReactNode} from 'react';
import MenuDrawer from '@common-components/menu-drawer';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {WIDTH_SCREEN} from '@constants/dimesions';
import {isTablet} from '@utils/isTablet';

declare interface IParams {
  onPaddingGestureStart?: () => void;
  onPaddingGestureEnd?: () => void;
  MenuContent: JSX.Element;
  children: ReactNode;
}

const useMenuDrawer = ({
  MenuContent,
  children,
  onPaddingGestureEnd,
  onPaddingGestureStart,
}: IParams): [ReactNode, () => void, () => void] => {
  const [shownMenu, setShowMenu] = useState(false);

  const onHideMenu = (): void => {
    setShowMenu(false);
  };
  const onShowMenu = (): void => {
    setShowMenu(true);
  };

  const ShowMenu = (
    <MenuDrawer
      open={shownMenu}
      menuContent={MenuContent}
      position="right"
      onShowMenu={setShowMenu}
      menuWidth={isTablet() ? 300 : WIDTH_SCREEN * 0.7}
      animationTime={250}
      paddingGesture={50}
      tapToClose
      backgroundColor={ACCENT_COLOR_BLUE}
      opacity={0.35}
      onPaddingGestureStart={onPaddingGestureStart}
      onPaddingGestureEnd={onPaddingGestureEnd}
    >
      {children}
    </MenuDrawer>
  );
  return [ShowMenu, onShowMenu, onHideMenu];
};

export default useMenuDrawer;
