import React from 'react';
import {Text} from 'react-native';
import {render} from '@testing-library/react-native';
import Window from '@components/window';

const UserItemTest = () => {
  return (
    <Window preset="close" backgroundColor="#FFF" width={100} opacity={0.5} closeWindow={() => {}}>
      <Text>window</Text>
    </Window>
  );
};

test('mount', async () => {
  const page = render(<UserItemTest />);
  expect(page).not.toBeNull();
});
