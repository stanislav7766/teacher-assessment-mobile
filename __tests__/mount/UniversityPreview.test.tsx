import React from 'react';
import {render} from '@testing-library/react-native';
import UniversityPreview from '@components/university-preview';

const UniversityTest = () => {
  return <UniversityPreview preview="" name="" />;
};

test('mount', async () => {
  const page = render(<UniversityTest />);
  expect(page).not.toBeNull();
});
