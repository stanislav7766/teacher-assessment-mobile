import React from 'react';
import {render} from '@testing-library/react-native';
import UniversityItem from '@components/university-item';

const UniversityTest = () => {
  return <UniversityItem preview="" rating={0} onPress={() => {}} name="" />;
};

test('mount', async () => {
  const page = render(<UniversityTest />);
  expect(page).not.toBeNull();
});
