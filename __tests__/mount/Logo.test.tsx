import React from 'react';
import {render} from '@testing-library/react-native';
import Logo from '@components/logo';

const LogoTest = () => {
  return <Logo />;
};

test('mount', async () => {
  const page = render(<LogoTest />);
  expect(page).not.toBeNull();
});
