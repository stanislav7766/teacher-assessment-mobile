import React from 'react';
import {View} from 'react-native';
import Touchable from '@common-components/touchable';
import {ISvgFactoryParams, IOnPress} from 'types/common';
import useSvgFactory from '@hooks/use-svg-factory';
import getMenu from '@assets/svg-ts/menu';
import getBack from '@assets/svg-ts/arrow-back';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {styles, col, row, left, right, mx0} from './styles';

const svgFactoryParams: ISvgFactoryParams = {width: 40, height: 25, fillAccent: ACCENT_COLOR_BLUE};

declare interface IHeaderProps {
  SubHeader: JSX.Element;
  onPressBack: IOnPress;
  onPressMenu: IOnPress;
}

const Header = ({SubHeader, onPressBack, onPressMenu}: IHeaderProps) => {
  const MenuSvg = useSvgFactory(getMenu, svgFactoryParams);
  const BackSvg = useSvgFactory(getBack, svgFactoryParams);
  const Menu = <Touchable Child={MenuSvg} onPress={onPressMenu} />;
  const Back = <Touchable Child={BackSvg} onPress={onPressBack} />;

  return (
    <View style={[styles.container, row]}>
      <View style={styles.header}>
        <View style={[row, mx0]}>
          <View style={[col, left]}>{Back}</View>
          <View style={[col, styles.subHeader]}>{SubHeader}</View>
          <View style={[col, right]}>{Menu}</View>
        </View>
      </View>
    </View>
  );
};
export default Header;
