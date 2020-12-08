import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';

const Section = ({text}: {text: string}) => (
  <View style={styles.section}>
    <Text style={styles.sectionText}>{text}</Text>
  </View>
);
export default Section;
