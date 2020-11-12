import React, {useState} from 'react';
import {View, Text, ViewStyle, TextStyle, StyleSheet} from 'react-native';
import MenuDrawer from '@common-components/menu-drawer';
import Header from '@components/header';
import {IOnPress} from 'types/common';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {styles} from './styles';

const Main: React.FC = () => {
  const [shownMenu, setShownMenu] = useState(false);
  const onPress: IOnPress = (): void => {
    setShownMenu(!shownMenu);
  };

  const DrawerContent = (
    <View style={drawerStyles.drawer}>
      <Text style={drawerStyles.textColor}>Here we go</Text>
    </View>
  );

  return (
    <>
      <MenuDrawer
        open={shownMenu}
        menuContent={DrawerContent}
        position="right"
        onShowMenu={setShownMenu}
        menuPercent={70}
        animationTime={250}
        paddingGesture={50}
        tapToClose
        backgroundColor={ACCENT_COLOR_BLUE}
        opacity={0.35}
      >
        <Header onPressBack={onPress} onPressMenu={onPress} SubHeader={<Text>Main Screen</Text>} />
        <View style={styles.wrap}>
          <Text>Here we go</Text>
        </View>
      </MenuDrawer>
    </>
  );
};

export default Main;

type Styles = {
  drawer: ViewStyle;
  textColor: TextStyle;
};
const drawerStyles = StyleSheet.create<Styles>({
  drawer: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: ACCENT_COLOR_BLUE},
  textColor: {color: 'white'},
});
