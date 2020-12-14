import React from 'react';
import {View, Text} from 'react-native';
import {render} from '@testing-library/react-native';
import Form from '@common-components/form';

const BtnTest = () => {
  return (
    <Form backgroundColor="#fff">
      <View>
        <Text>form</Text>
      </View>
    </Form>
  );
};

test('mount', async () => {
  const page = render(<BtnTest />);
  expect(page).not.toBeNull();
});
