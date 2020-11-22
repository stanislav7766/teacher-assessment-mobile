import React, {ReactNode} from 'react';
import {View, Text} from 'react-native';
import RadioBtn from '@common-components/radio-btn';
import {randomID} from '@utils/random-id';
import {styles, col} from './styles';

const RadioForm = ({size, radioProps, selectedValue, onPress}: IRadioFormProps) => {
  const renderBtns = () =>
    radioProps.map(
      ({value, label}): ReactNode => (
        <View key={randomID()} style={col}>
          <Text style={styles.label}>{label}</Text>
          <RadioBtn size={size} isSelected={value === selectedValue} onPress={() => onPress(value)} />
        </View>
      ),
    );

  return <View style={styles.container}>{renderBtns()}</View>;
};
declare interface IRadioFormProps {
  size: number;
  radioProps: Array<{label: string; value: number}>;
  selectedValue: number;
  onPress: (value: number) => void;
}

export default RadioForm;
