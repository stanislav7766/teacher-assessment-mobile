import React from 'react';
import {render} from '@testing-library/react-native';
import InputPicker from '@components/input-picker';

const InputPickerTest = () => {
  return <InputPicker onPress={() => {}} onClearValue={() => {}} value="" />;
};

test('mount', async () => {
  const page = render(<InputPickerTest />);
  expect(page).not.toBeNull();
});
