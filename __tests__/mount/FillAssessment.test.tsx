import React, {useState, useCallback} from 'react';
import {render} from '@testing-library/react-native';
import {QA} from '@api/review/default';
import FillAssessment from '@components/fill-assessment';

const FillAssessmentTest = () => {
  const [QAs, setQAs] = useState(QA);
  const [review, setReview] = useState('');
  const onChangeQAs = useCallback((No: number, answer: number) => {
    setQAs(old => {
      const index = old.findIndex(val => val.No === No);
      const copy = [...old];
      copy[index].answer = answer;
      return copy;
    });
  }, []);
  return (
    <FillAssessment
      review={review}
      QAs={QAs}
      username="Почкин Петр Семенович"
      updateQAs={onChangeQAs}
      updateReview={setReview}
    />
  );
};

test('mount', async () => {
  const page = render(<FillAssessmentTest />);
  expect(page).not.toBeNull();
});
