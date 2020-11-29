import React, {useState, ReactNode} from 'react';
import {Text, View} from 'react-native';
import Window, {IHeader} from '@components/window';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {WIDTH_SCREEN} from '@constants/dimesions';
import {styles} from './styles';

declare interface IParams {
  text: string;
  preset: IHeader;
  onClose: () => void;
}

const useModalHeader = ({text, preset, onClose}: IParams): [ReactNode, () => void, () => void] => {
  const [shownWindow, setShowWindow] = useState(false);

  const onHideWindow = (): void => {
    setShowWindow(false);
  };
  const onShowWindow = (): void => {
    setShowWindow(true);
  };

  const closeWindow = (): void => {
    onClose();
    onHideWindow();
  };

  const ShowWindow = shownWindow && (
    <Window
      opacity={0.35}
      preset={preset}
      closeWindow={closeWindow}
      backgroundColor={ACCENT_COLOR_BLUE}
      width={WIDTH_SCREEN * 0.8}
    >
      <View style={styles.windowTextWrap}>
        <Text style={styles.windowText}>{text}</Text>
      </View>
    </Window>
  );
  return [ShowWindow, onShowWindow, onHideWindow];
};

export default useModalHeader;
