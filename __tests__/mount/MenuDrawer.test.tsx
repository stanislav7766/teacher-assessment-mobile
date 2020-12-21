import React from 'react';
import {render} from '@testing-library/react-native';
import {MenuDrawer} from '@stanislav7766/rn-menu-drawer';
import {View} from 'react-native';

const MenuDrawerTest = () => {
  return (
    <MenuDrawer
      tapToClose
      paddingGesture={50}
      onShowMenu={() => {}}
      backgroundColor="#fff"
      position="right"
      drawerWidth={200}
      animationTime={250}
      MenuContent={<View />}
      open
      opacity={0.5}
    >
      <View />
    </MenuDrawer>
  );
};

test('mount', async () => {
  const page = render(<MenuDrawerTest />);
  expect(page).not.toBeNull();
});
