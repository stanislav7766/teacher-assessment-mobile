import React, {useState, ReactNode} from 'react';
import MenuDrawer from '@common-components/menu-drawer';
import MenuContent from '@components/menu-content';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {WIDTH_SCREEN} from '@constants/dimesions';
import {EasyRouterNavigator} from 'react-native-easy-router';
import {isTablet} from '@utils/isTablet';

declare interface IParams {
  navigator: EasyRouterNavigator;
  children: ReactNode;
}

const useMenuDrawer = ({children, navigator}: IParams): [ReactNode, () => void, () => void] => {
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
      menuContent={<MenuContent navigator={navigator} />}
      position="right"
      onShowMenu={setShowMenu}
      menuWidth={isTablet() ? 300 : WIDTH_SCREEN * 0.7}
      animationTime={250}
      paddingGesture={50}
      tapToClose
      backgroundColor={ACCENT_COLOR_BLUE}
      opacity={0.35}
    >
      {children}
    </MenuDrawer>
  );
  return [ShowMenu, onShowMenu, onHideMenu];
};

export default useMenuDrawer;
