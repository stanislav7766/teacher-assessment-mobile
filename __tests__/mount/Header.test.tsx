import React from 'react';
import {Text} from 'react-native';
import {render} from '@testing-library/react-native';
import Header from '@components/header';

const HeaderTest = () => {
  return <Header onPressBack={() => {}} onPressMenu={() => {}} SubHeader={<Text>Header</Text>} />;
};

test('mount', async () => {
  const page = render(<HeaderTest />);
  expect(page).not.toBeNull();
});
