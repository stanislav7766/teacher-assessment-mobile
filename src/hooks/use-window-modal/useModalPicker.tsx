import React, {useState, ReactNode, useEffect} from 'react';
import WheelPicker from '@common-components/wheel-picker';
import Window from '@components/window';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {isEmptyString} from '@utils/validation/isEmpty';
import {styles, pickerSizes, windowWidth} from './styles';

type Mode = 'single' | 'multiple';
declare interface IParams {
  pickerItems: Array<{label: string; value: string}>;
  selectedItems: Array<string>;
  mode: Mode;
  setSelectedItems: (items: Array<string>) => void;
}
const isItemInArray = (arr: Array<string>, item: string): boolean => arr.includes(item);

const useModalPicker = ({
  pickerItems,
  mode,
  setSelectedItems,
  selectedItems,
}: IParams): [ReactNode, () => void, () => void] => {
  const [shownWindow, setShowWindow] = useState(false);

  const firstItem = pickerItems[0]?.value ?? '';
  const [selectedItem, setSelectedItem] = useState<string>(firstItem);

  useEffect(() => {
    setSelectedItem(firstItem);
  }, [firstItem]);

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
  const isSingle = mode === 'single';
  const allowUpdate = !isItemInArray(selectedItems, selectedItem) && !isEmptyString(selectedItem);

  const closeWindow = (): void => {
    allowUpdate && (isSingle ? setSelectedItems([selectedItem]) : setSelectedItems([...selectedItems, selectedItem]));
    onHideWindow();
  };

  const ShowWindow = shownWindow && (
    <Window
      opacity={0.35}
      preset="check"
      closeWindow={closeWindow}
      backgroundColor={ACCENT_COLOR_BLUE}
      width={windowWidth}
    >
      {Picker}
    </Window>
  );
  return [ShowWindow, onShowWindow, onHideWindow];
};

export default useModalPicker;
