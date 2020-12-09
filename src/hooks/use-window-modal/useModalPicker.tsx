import React, {useState, ReactNode} from 'react';
import WheelPicker from '@common-components/wheel-picker';
import Window from '@components/window';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {WIDTH_SCREEN} from '@constants/dimesions';
import {isEmptyString} from '@utils/validation/isEmpty';
import {styles, pickerSizes} from './styles';

declare interface IParams {
  pickerItems: Array<{label: string; value: string}>;
  selectedItems: Array<string>;
  setSelectedItems: (items: Array<string>) => void;
}
const isItemInArray = (arr: Array<string>, item: string): boolean => arr.includes(item);

const useModalPicker = ({
  pickerItems,
  setSelectedItems,
  selectedItems,
}: IParams): [ReactNode, () => void, () => void] => {
  const [shownWindow, setShowWindow] = useState(false);

  const firstItem = pickerItems[0]?.value ?? '';
  const [selectedItem, setSelectedItem] = useState<string>(firstItem);

  const Picker = (
    <WheelPicker
      textStyle={styles.pickerText}
      backgroundColor="#fff"
      sizes={pickerSizes}
      items={pickerItems}
      selectedValue={selectedItem}
      onValueChange={(val: string): void => {
        setSelectedItem(val);
      }}
    />
  );

  const onHideWindow = (): void => {
    setShowWindow(false);
  };
  const onShowWindow = (): void => {
    setShowWindow(true);
  };

  const closeWindow = (): void => {
    !isItemInArray(selectedItems, selectedItem) &&
      !isEmptyString(selectedItem) &&
      setSelectedItems([...selectedItems, selectedItem]);
    onHideWindow();
  };

  const ShowWindow = shownWindow && (
    <Window
      opacity={0.35}
      preset="check"
      closeWindow={closeWindow}
      backgroundColor={ACCENT_COLOR_BLUE}
      width={WIDTH_SCREEN * 0.8}
    >
      {Picker}
    </Window>
  );
  return [ShowWindow, onShowWindow, onHideWindow];
};

export default useModalPicker;
