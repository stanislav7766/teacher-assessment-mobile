import React, {ReactNode} from 'react';
import {View, Text} from 'react-native';
import {col, left, styles} from './styles';

declare interface IQAItemProps {
  No: number;
  question: string;
  Answer: ReactNode;
}
const QAItem = ({No, question, Answer}: IQAItemProps) => (
  <View>
    <View style={styles.rowWrap}>
      <View style={styles.itemQuestion}>
        <Text style={styles.qText}>{`${No}. ${question}`}</Text>
      </View>
    </View>
    <View style={styles.rowWrap}>
      <View style={[col, left]} />
      <View style={[styles.itemAnswer]}>{Answer}</View>
    </View>
  </View>
);

export default QAItem;
