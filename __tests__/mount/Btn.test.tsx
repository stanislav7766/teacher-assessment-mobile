import React from 'react';
import {render} from '@testing-library/react-native';
import Btn from '@common-components/btn';

const BtnTest = () => {
  return <Btn title="" onPress={() => {}} />;
};

test('mount', async () => {
  const page = render(<BtnTest />);
  expect(page).not.toBeNull();
});
