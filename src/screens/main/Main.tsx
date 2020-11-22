import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, ViewStyle, TextStyle, StyleSheet, ScrollView} from 'react-native';
import MenuDrawer from '@common-components/menu-drawer';
import Header from '@components/header';
import {IOnPress, ISvgFactoryParams} from 'types/common';
import {ACCENT_COLOR_BLUE} from '@constants/colors';
import {WIDTH_SCREEN} from '@constants/dimesions';
import useSvgFactory from '@hooks/use-svg-factory';
import getBin from '@assets/svg-ts/trash-bin';
import ViewAssessment from '@components/view-assessment';
import FillAssessment from '@components/fill-assessment';
import {styles as layoutStyles} from '@common-styles/layout';
import Btn from 'common-components/btn';
import UserItem from '@components/user-item';
import {DEFAULT_INDENT} from '@constants/indent';
import {isTablet} from '@utils/isTablet';
import {styles} from './styles';

const QAs = [
  {
    No: 1,
    question: 'Доступність матеріалу',
    answer: 4,
  },
  {
    No: 2,
    question: 'Пояснення важких тем',
    answer: 4,
  },
  {
    No: 3,
    question: 'Дискусія',
    answer: 4,
  },
  {
    No: 4,
    question: 'Чіткість дикції, нормальний темп викладу',
    answer: 4,
  },
  {
    No: 5,
    question: 'Актуальність матеріалу',
    answer: 4,
  },
  {
    No: 6,
    question: 'Вимогливість',
    answer: 4,
  },
  {
    No: 7,
    question: 'Заохочення студентів',
    answer: 4,
  },
  {
    No: 8,
    question: "Об'єктивність оцінювання",
    answer: 4,
  },
  {
    No: 9,
    question: 'Шанобливе ставлення до студентів',
    answer: 4,
  },
];

const QAQuestions = QAs.map(({answer, ...rest}) => rest);
const QAsAnswer = QAs.map(({No}) => ({No, answer: 0}));

const {row} = layoutStyles;

const svgFactoryParams: ISvgFactoryParams = {width: 20, height: 20};

const Main: React.FC = () => {
  const [shownMenu, setShownMenu] = useState(false);
  const [review, setReview] = useState('');
  const [QAAnswers, setQAAnswers] = useState(QAsAnswer);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const updateAnswers = (No: number, answer: number): void => {
    const copy = [...QAAnswers];
    copy[No - 1] = {No, answer};
    setQAAnswers(copy);
  };

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
        onPaddingGestureStart={(): void => {
          setScrollEnabled(false);
        }}
        onPaddingGestureEnd={(): void => {
          setScrollEnabled(true);
        }}
      >
        <Header onPressBack={onPress} onPressMenu={onPress} SubHeader={<Text>Main Screen</Text>} />

        <ScrollView scrollEnabled={scrollEnabled} style={{marginTop: 50 + DEFAULT_INDENT}}>
          {useMemo(
            () => (
              <View style={[row, {marginTop: DEFAULT_INDENT}]}>
                <UserItem
                  rating={4.7}
                  userRole="Студент"
                  DeleteUser={BinSvg}
                  mode="full"
                  Btn={Btt}
                  username="Шимсединов Тимур Гафарович"
                />
              </View>
            ),
            [BinSvg, Btt],
          )}
          {useMemo(
            () => (
              <View style={[row, {marginTop: DEFAULT_INDENT}]}>
                <FillAssessment
                  username="Шемсединов Тимур Гафарович"
                  answers={QAAnswers}
                  questions={QAQuestions}
                  review={review}
                  updateReview={setReview}
                  updateAnswers={updateAnswers}
                />
              </View>
            ),
            [QAAnswers, QAQuestions, review],
          )}
          {useMemo(
            () => (
              <>
                <View style={[row, {marginTop: DEFAULT_INDENT}]}>
                  <ViewAssessment
                    QAs={QAs}
                    withTeacher
                    username="Шемсединов Тимур Гафарович"
                    review={review}
                    rating={4.7}
                  />
                </View>
                <View style={[row, {marginBottom: DEFAULT_INDENT, marginTop: DEFAULT_INDENT}]}>
                  <ViewAssessment QAs={QAs} withTeacher={false} review={review} rating={4.7} />
                </View>
              </>
            ),
            [review],
          )}
        </ScrollView>
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
