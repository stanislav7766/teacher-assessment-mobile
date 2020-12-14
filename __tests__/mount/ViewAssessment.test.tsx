import React, {useState} from 'react';
import {render} from '@testing-library/react-native';
import {QA} from '@api/review/default';
import ViewAssessment from '@components/view-assessment';

const ViewAssessmentTest = () => {
  const [QAs] = useState(QA);
  const [review] = useState('review text here');
  return <ViewAssessment rating={4} withTeacher={false} review={review} QAs={QAs} username="Почкин Петр Семенович" />;
};

test('mount', async () => {
  const page = render(<ViewAssessmentTest />);
  expect(page).not.toBeNull();
});
