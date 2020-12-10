import React from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';
import Input from '@common-components/text-input';
import InputPicker from '@components/input-picker';
import Btn from '@common-components/btn';
import {IGroups} from 'types/group';
import {IFaculties} from 'types/faculty';
import {styles} from './styles';

type IOnChange = (text: string) => void;

declare interface IViewProps<IPicker> {
  username: string;
  refresh: {refreshing: boolean; onRefresh: () => void};
  selectedFaculties: IFaculties;
  selectedGroups: IGroups;
  onChangeUsername: IOnChange;
  onClearSelectedValue: (picker: IPicker) => void;
  onPressPicker: (picker: IPicker) => void;
  onPressAdd: () => void;
}

const AddFacultyStudentView = <IPicker,>({
  onPressAdd,
  onChangeUsername,
  selectedFaculties,
  selectedGroups,
  onClearSelectedValue,
  onPressPicker,
  username,
  refresh,
}: IViewProps<IPicker>) => {
  const facultiesValue = selectedFaculties.join(', ');
  const groupsValue = selectedGroups.join(', ');

  const pickerFaculty: IPicker = ('faculty' as unknown) as IPicker;
  const pickerGroup: IPicker = ('group' as unknown) as IPicker;

  const onClearFaculties = (): void => onClearSelectedValue(pickerFaculty);
  const onClearGroups = (): void => onClearSelectedValue(pickerGroup);
  const onPressFaculties = (): void => onPressPicker(pickerFaculty);
  const onPressGroups = (): void => onPressPicker(pickerGroup);
  return (
    <View style={styles.container}>
      <ScrollView refreshControl={<RefreshControl {...refresh} />} contentContainerStyle={styles.scrollview}>
        <View style={styles.input}>
          <Input placeholder="ПІБ" value={username} onChange={text => onChangeUsername(text)} />
        </View>
        <View style={styles.input}>
          <InputPicker
            value={facultiesValue}
            onClearValue={onClearFaculties}
            onPress={onPressFaculties}
            placeholder="Факультет"
          />
        </View>
        <View style={styles.input}>
          <InputPicker value={groupsValue} onClearValue={onClearGroups} onPress={onPressGroups} placeholder="Група" />
        </View>
        <View style={styles.btn}>
          <Btn onPress={onPressAdd} title="Додати" />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddFacultyStudentView;
