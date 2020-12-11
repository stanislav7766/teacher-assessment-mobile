import React from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';
import Input from '@common-components/text-input';
import InputPicker from '@components/input-picker';
import Btn from '@common-components/btn';
import {IGroups} from 'types/group';
import {styles} from './styles';

type IOnChange = (text: string) => void;

declare interface IViewProps {
  username: string;
  refresh: {refreshing: boolean; onRefresh: () => void};
  selectedGroups: IGroups;
  onChangeUsername: IOnChange;
  onClearSelectedGroups: () => void;
  onPressPicker: () => void;
  onPressAdd: () => void;
}

const AddFacultyAssessmentView = ({
  onPressAdd,
  onChangeUsername,
  selectedGroups,
  onClearSelectedGroups,
  onPressPicker,
  username,
  refresh,
}: IViewProps) => {
  const groupsValue = selectedGroups.join(', ');
  return (
    <View style={styles.container}>
      <ScrollView refreshControl={<RefreshControl {...refresh} />} contentContainerStyle={styles.scrollview}>
        <View style={styles.input}>
          <Input placeholder="ПІБ викладача" value={username} onChange={text => onChangeUsername(text)} />
        </View>
        <View style={styles.input}>
          <InputPicker
            value={groupsValue}
            onClearValue={onClearSelectedGroups}
            onPress={onPressPicker}
            placeholder="Групи"
          />
        </View>
        <View style={styles.btn}>
          <Btn onPress={onPressAdd} title="Згенерувати" />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddFacultyAssessmentView;
