import React from 'react';
import {render} from '@testing-library/react-native';
import Section from '@components/section';

const SectionTest = () => {
  return <Section text="section" />;
};

test('mount', async () => {
  const page = render(<SectionTest />);
  expect(page).not.toBeNull();
});
