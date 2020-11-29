import React, {useState, ReactNode} from 'react';
import {Text, View} from 'react-native';
import Window, {IFooter} from '@components/window';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {WIDTH_SCREEN} from '@constants/dimesions';
import {styles} from './styles';

declare interface IParams {
  text: string;
  preset: IFooter;
  onBottomYes: () => void;
  onBottomNo: () => void;
}

const useModalFooter = ({text, preset, onBottomNo, onBottomYes}: IParams): [ReactNode, () => void, () => void] => {
  const [shownWindow, setShowWindow] = useState(false);

  const onHideWindow = (): void => {
    setShowWindow(false);
  };
  const onShowWindow = (): void => {
    setShowWindow(true);
  };

  const ShowWindow = shownWindow && (
    <Window
      opacity={0.35}
      preset={preset}
      closeWindow={onHideWindow}
      onBottomYes={onBottomYes}
      onBottomNo={onBottomNo}
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

export default useModalFooter;
