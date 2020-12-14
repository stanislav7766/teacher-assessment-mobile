import React from 'react';
import {render} from '@testing-library/react-native';
import RadioForm from '@components/radio-form';

const RadioFormTest = () => {
  return <RadioForm onPress={() => {}} radioProps={[]} size={10} selectedValue={0} />;
};

test('mount', async () => {
  const page = render(<RadioFormTest />);
  expect(page).not.toBeNull();
});
