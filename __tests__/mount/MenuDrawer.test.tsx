import React from 'react';
import {render} from '@testing-library/react-native';
import MenuDrawer from '@common-components/menu-drawer';
import {View} from 'react-native';

const MenuDrawerTest = () => {
  return (
    <MenuDrawer
      tapToClose
      paddingGesture={50}
      onShowMenu={() => {}}
      backgroundColor="#fff"
      position="right"
      menuWidth={200}
      animationTime={250}
      menuContent={<View />}
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
