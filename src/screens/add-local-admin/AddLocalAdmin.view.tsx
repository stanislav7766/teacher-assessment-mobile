import React from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';
import Input from '@common-components/text-input';
import InputPicker from '@components/input-picker';
import Btn from '@common-components/btn';
import {IFaculties} from 'types/faculty';
import {styles} from './styles';

type IOnChange = (text: string) => void;

declare interface IViewProps {
  username: string;
  refresh: {refreshing: boolean; onRefresh: () => void};
  selectedFaculties: IFaculties;
  onChangeUsername: IOnChange;
  onClearSelectedFaculties: () => void;
  onPressPicker: () => void;
  onPressAdd: () => void;
}

const AddLocalAdminView = ({
  onPressAdd,
  onChangeUsername,
  selectedFaculties,
  onClearSelectedFaculties,
  onPressPicker,
  username,
  refresh,
}: IViewProps) => {
  const facultiesValue = selectedFaculties.join(', ');
  return (
    <View style={styles.container}>
      <ScrollView refreshControl={<RefreshControl {...refresh} />} contentContainerStyle={styles.scrollview}>
        <View style={styles.input}>
          <Input placeholder="ПІБ" value={username} onChange={text => onChangeUsername(text)} />
        </View>
        <View style={styles.input}>
          <InputPicker
            value={facultiesValue}
            onClearValue={onClearSelectedFaculties}
            onPress={onPressPicker}
            placeholder="Факультет"
          />
        </View>
        <View style={styles.btn}>
          <Btn onPress={onPressAdd} title="Додати" />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddLocalAdminView;
