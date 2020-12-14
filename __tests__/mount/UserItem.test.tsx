import React from 'react';
import {render} from '@testing-library/react-native';
import UserItem from '@components/user-item';

const UserItemTest = () => {
  return <UserItem mode="partial" userRole="" username="name" rating={4.7} />;
};

test('mount', async () => {
  const page = render(<UserItemTest />);
  expect(page).not.toBeNull();
});
