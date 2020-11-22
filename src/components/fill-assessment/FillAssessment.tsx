import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Form from '@common-components/form';
import AssessmentHeader from '@components/assessment-header';
import RadioForm from '@components/radio-form';
import {randomID} from '@utils/random-id';
import QAItem from './QAItem';
import {row, styles} from './styles';

const renderRadioProps = (
  num: number,
): Array<{
  label: string;
  value: number;
}> => new Array(num).fill(0).map((_, i: number) => ({label: `${i + 1}`, value: i + 1}));

declare interface IFillAssessmentProps {
  review: string;
  questions: Array<{No: number; question: string}>;
  answers: Array<{No: number; answer: number}>;
  updateReview: (text: string) => void;
  updateAnswers: (No: number, answer: number) => void;
  username?: string;
  avatar?: string;
}

const FillAssessment = ({
  review,
  updateReview,
  updateAnswers,
  questions,
  answers,
  username,
  avatar,
}: IFillAssessmentProps) => {
  const QAItems = questions.map(({No, question}, i) => {
    const Answer = (
      <RadioForm
        size={15}
        radioProps={renderRadioProps(5)}
        selectedValue={answers[i].answer}
        onPress={(value: number): void => {
          updateAnswers(No, value);
        }}
      />
    );
    return <QAItem key={randomID()} {...{No, question, Answer}} />;
  });

  return (
    <Form>
      <AssessmentHeader height={50} textColor="#fff" mode="teacher" avatar={avatar} username={username} />
      <View style={[row, styles.qa]}>
        <Form backgroundColor="#fff">
          <View>{QAItems}</View>
        </Form>
      </View>
      <View style={[row, styles.ownReview]}>
        <Text style={[styles.ownReviewText]}>Власний відгук:</Text>
      </View>
      <View style={[row, styles.review]}>
        <Form backgroundColor="#fff">
          <View style={styles.input}>
            <TextInput
              textAlignVertical="top"
              style={[styles.reviewText]}
              multiline
              scrollEnabled={false}
              numberOfLines={5}
              onChangeText={updateReview}
              value={review}
            />
          </View>
        </Form>
      </View>
    </Form>
  );
};

FillAssessment.defaultProps = {
  username: '',
  avatar: undefined,
};

export default FillAssessment;
