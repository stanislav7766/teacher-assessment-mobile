import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import Touchable from '@common-components/touchable';
import useSvgFactory from '@hooks/use-svg-factory';
import {ISvgFactoryParams} from 'types/common';
import getClose from '@assets/svg-ts/close';
import {ACCENT_COLOR_RED} from '@constants/colors';
import {isEmptyString} from '@utils/validation/isEmpty';
import {styles, getBorderColor, inputDefaultSize, getClearContainer} from './styles';

const getCloseSvgParams = (size: number): ISvgFactoryParams => ({
  width: size,
  height: size,
  fillAccent: ACCENT_COLOR_RED,
});

const InputPicker = ({value, error, placeholder, width, height, onPress, onClearValue}: IInputPickerProps) => {
  const inputBorder = getBorderColor(!isEmptyString(error));

  const clearSvgSize = (height as number) * 0.5;
  const CloseSvg = useSvgFactory(getClose, getCloseSvgParams(clearSvgSize));

  const TextInput = (
    <View style={styles.centerY}>
      <Text style={[styles.input, {height}]}>{value}</Text>
    </View>
  );

  return (
    <View style={[styles.container, {width}]}>
      {!isEmptyString(placeholder) && <Text style={styles.placeholder}>{placeholder}</Text>}
      <View style={[styles.inputContainer, inputBorder, {height, paddingRight: clearSvgSize + 20}]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.inputScroll}>
          <Touchable withFeedback={false} Child={TextInput} onPress={onPress} />
        </ScrollView>
      </View>
      <Text style={styles.error}>{error}</Text>
      <View style={getClearContainer(height as number)}>
        <View style={styles.clearWrap}>
          <Touchable Child={CloseSvg} onPress={onClearValue} />
        </View>
      </View>
    </View>
  );
};

declare interface IInputPickerProps {
  value: string;
  error?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  onPress: () => void;
  onClearValue: () => void;
}

InputPicker.defaultProps = {
  placeholder: undefined,
  error: '',
  width: inputDefaultSize.width,
  height: inputDefaultSize.height,
};

export default InputPicker;
