import React, {useState, useCallback} from 'react';
import {View, Text, ScrollView} from 'react-native';
import useMenuDrawer from '@hooks/use-menu-drawer';
import Header from '@components/header';
import {ISvgFactoryParams} from 'types/common';
import {WIDTH_SCREEN} from '@constants/dimesions';
import useSvgFactory from '@hooks/use-svg-factory';
import getBin from '@assets/svg-ts/trash-bin';
import ViewAssessment from '@components/view-assessment';
import FillAssessment from '@components/fill-assessment';
import {styles as layoutStyles} from '@common-styles/layout';
import Btn from 'common-components/btn';
import UserItem from '@components/user-item';
import {DEFAULT_INDENT} from '@constants/indent';
import {randomID} from '@utils/random-id';
import {drawerStyles} from './styles';

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

const QAsAnswer = QAs.map(({No, question}) => ({No, question, answer: 0, id: randomID()}));

const {row} = layoutStyles;

const svgFactoryParams: ISvgFactoryParams = {width: 20, height: 20};

const Main = () => {
  const [review, setReview] = useState('');
  const [QAAnswers, setQAAnswers] = useState(QAsAnswer);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const BinSvg = useSvgFactory(getBin, svgFactoryParams);
  const Btt = <Btn onPress={(): void => {}} height={40} width={WIDTH_SCREEN / 3} title="Переглянути сторінку" />;

  const DrawerContent = (
    <View style={drawerStyles.drawer}>
      <View style={row}>
        <UserItem mode="partial" userRole="Студент" textColor="white" username="Шимсединов Тимур Гафарович" />
      </View>
    </View>
  );

  const onChangeAnswers = useCallback((No: number, answer: number) => {
    setQAAnswers(old => {
      const index = old.findIndex(val => val.No === No);
      const copy = [...old];
      copy[index].answer = answer;
      return copy;
    });
  }, []);

  const App = (
    <>
      <ScrollView scrollEnabled={scrollEnabled} style={{marginTop: 50 + DEFAULT_INDENT}}>
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
        <View style={[row, {marginTop: DEFAULT_INDENT}]}>
          <FillAssessment
            username="Шемсединов Тимур Гафарович"
            QAs={QAAnswers}
            review={review}
            updateReview={setReview}
            updateQAs={onChangeAnswers}
          />
        </View>
        <View style={[row, {marginTop: DEFAULT_INDENT}]}>
          <ViewAssessment QAs={QAs} withTeacher username="Шемсединов Тимур Гафарович" review={review} rating={4.7} />
        </View>
        <View style={[row, {marginBottom: DEFAULT_INDENT, marginTop: DEFAULT_INDENT}]}>
          <ViewAssessment QAs={QAs} withTeacher={false} review={review} rating={4.7} />
        </View>
      </ScrollView>
    </>
  );

  const [ShowMenu, onShowMenu] = useMenuDrawer({
    MenuContent: DrawerContent,
    children: App,
    onPaddingGestureStart: (): void => {
      setScrollEnabled(false);
    },
    onPaddingGestureEnd: (): void => {
      setScrollEnabled(true);
    },
  });

  return (
    <>
      {ShowMenu}
      <Header onPressBack={onShowMenu} onPressMenu={onShowMenu} SubHeader={<Text>Main Screen</Text>} />
    </>
  );
};

export default Main;
