import React, {useState} from 'react';
import {View, Text, ViewStyle, TextStyle, StyleSheet} from 'react-native';
import MenuDrawer from '@common-components/menu-drawer';
import Header from '@components/header';
import {IOnPress, ISvgFactoryParams} from 'types/common';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {WIDTH_SCREEN} from '@constants/dimesions';
import useSvgFactory from '@hooks/use-svg-factory';
import getBin from '@assets/svg-ts/trash-bin';
import {styles as layoutStyles} from '@common-styles/layout';
import Btn from 'common-components/btn';
import UserItem from '@components/user-item';
import {DEFAULT_INDENT} from '@constants/indent';
import {isTablet} from '@utils/isTablet';
import {styles} from './styles';

const {row} = layoutStyles;

const svgFactoryParams: ISvgFactoryParams = {width: 20, height: 20};

const Main: React.FC = () => {
  const [shownMenu, setShownMenu] = useState(false);
  const onPress: IOnPress = (): void => {
    setShownMenu(!shownMenu);
  };

  const Btt = <Btn onPress={onPress} height={40} width={WIDTH_SCREEN / 3} title="Переглянути сторінку" />;

  const DrawerContent = (
    <View style={drawerStyles.drawer}>
      <View style={row}>
        <UserItem mode="partial" userRole="Студент" textColor="white" username="Шимсединов Тимур Гафарович" />
      </View>
    </View>
  );
  const BinSvg = useSvgFactory(getBin, svgFactoryParams);

  return (
    <>
      <MenuDrawer
        open={shownMenu}
        menuContent={DrawerContent}
        position="right"
        onShowMenu={setShownMenu}
        menuWidth={isTablet() ? 300 : WIDTH_SCREEN * 0.7}
        animationTime={250}
        paddingGesture={50}
        tapToClose
        backgroundColor={ACCENT_COLOR_BLUE}
        opacity={0.35}
      >
        <Header onPressBack={onPress} onPressMenu={onPress} SubHeader={<Text>Main Screen</Text>} />
        <View style={styles.wrap}>
          <View style={row}>
            <UserItem
              rating={4.7}
              userRole="Студент"
              DeleteUser={BinSvg}
              mode="full"
              Btn={Btt}
              username="Шимсединов Тимур Гафарович"
            />
          </View>
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
  drawer: {flex: 1, paddingTop: DEFAULT_INDENT, alignItems: 'center', backgroundColor: ACCENT_COLOR_BLUE},
  textColor: {color: 'white'},
});
