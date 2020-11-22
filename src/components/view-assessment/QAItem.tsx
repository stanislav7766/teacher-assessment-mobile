import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';

declare interface IItemProps {
  No: number;
  question: string;
  answer: number;
}
const QAItem = ({No, question, answer}: IItemProps) => (
  <>
    <View style={styles.itemWrap}>
      <View style={styles.itemQuestion}>
        <Text style={styles.reviewText}>{`${No}. ${question}`}</Text>
      </View>
      <View style={styles.itemAnswer}>
        <Text style={styles.reviewText}>{answer}</Text>
      </View>
    </View>
    <View style={styles.itemUnderline} />
  </>
);

export default QAItem;
