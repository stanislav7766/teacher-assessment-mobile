import React, {memo, useState, useRef, useMemo, useCallback, useEffect} from 'react';
import {Animated, View, Text, TouchableOpacity, LayoutChangeEvent} from 'react-native';
import Form from '@common-components/form';
import useAnimated from '@hooks/use-animated';
import AssessmentHeader from '@components/assessment-header';
import {DEFAULT_INDENT} from '@constants/indent';
import {randomID} from '@utils/random-id';
import {getNFirstChars} from '@utils/map-text';
import {runSequence, getParalel} from '@utils/animations';
import defaultRefParams from './defaultRefParams';
import QAItem from './QAItem';
import {getQAOpacity, row, styles} from './styles';

const ViewAssessment = ({rating, review, withTeacher, username, avatar, QAs}: IViewAssessmentProps) => {
  const defaultParams = useMemo(() => defaultRefParams({withTeacher}), [withTeacher]);

  const reviewRef = useRef(review);

  const [reviewParams, setReviewRef] = useState(defaultParams.reviewParams);
  const [QAParams, setQARef] = useState(defaultParams.QAParams);
  const [assessmentParams] = useState(defaultParams.assessmentParams);

  const [animReviewHeight, compositeAnimationReview] = useAnimated({
    from: reviewParams.minHeight,
    to: reviewParams.maxHeight,
  });
  const [animQAHeight, compositeAnimationQA] = useAnimated({
    from: QAParams.minHeight,
    to: QAParams.maxHeight,
  });
  const [animAssessmentHeight, compositeAnimationAssessment] = useAnimated({
    from: assessmentParams.minHeight,
    to: assessmentParams.minHeight + reviewParams.maxHeight + QAParams.maxHeight + DEFAULT_INDENT * 2,
  });

  const [animQAOpacity, compositeAnimationQAOpacity] = useAnimated({
    from: 0,
    to: 1,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const renderReview = () => (!isExpanded ? `${getNFirstChars(review, 15)}...` : review);
  const renderQAItems = useCallback(() => QAs.map(props => <QAItem key={randomID()} {...props} />), [QAs]);
  const qaOpacity = getQAOpacity(isExpanded);

  const toggleDropdown = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const toValue: number = isExpanded ? 1 : 0;
    const duration: number = 400;
    const paralels = getParalel([
      compositeAnimationReview({toValue, duration}),
      compositeAnimationQA({toValue, duration}),
      compositeAnimationAssessment({toValue, duration}),
    ]);
    runSequence([paralels, compositeAnimationQAOpacity({toValue, duration})]);
  }, [
    isExpanded,
    compositeAnimationReview,
    compositeAnimationQA,
    compositeAnimationAssessment,
    compositeAnimationQAOpacity,
  ]);

  const onHiddenReview = (e: LayoutChangeEvent) => {
    if (review !== reviewRef.current) {
      reviewRef.current = review;
      setReviewRef({...reviewParams, maxHeight: e.nativeEvent.layout.height, firstSet: false});
      return;
    }
    reviewParams.firstSet && setReviewRef({...reviewParams, maxHeight: e.nativeEvent.layout.height, firstSet: false});
  };

  const onHiddenQA = (e: LayoutChangeEvent) => {
    QAParams.firstSet && setQARef({...QAParams, firstSet: false, maxHeight: e.nativeEvent.layout.height});
  };

  const HiddenReview = (
    <View style={[styles.hidden]}>
      <View style={[styles.review]}>
        <Form backgroundColor="#fff">
          <View style={{minHeight: defaultParams.reviewParams.minHeight}} onLayout={onHiddenReview}>
            <Text style={styles.reviewText}>{review}</Text>
          </View>
        </Form>
      </View>
    </View>
  );
  const HiddenQA = (
    <View style={[styles.hidden]}>
      <View onLayout={onHiddenQA}>{renderQAItems()}</View>
    </View>
  );

  const Toggle = (
    <TouchableOpacity onPress={toggleDropdown} style={styles.toggle}>
      <Text style={styles.collapse}>{!isExpanded ? 'Детальніше' : 'Звернути'}</Text>
    </TouchableOpacity>
  );

  return (
    <Form>
      <Animated.View style={{height: animAssessmentHeight}}>
        <AssessmentHeader
          height={50}
          textColor="#fff"
          {...(withTeacher ? {mode: 'teacher-rating', avatar, username, rating} : {mode: 'rating', rating})}
        />
        <View style={[row, styles.qa, qaOpacity]}>
          <Form backgroundColor="#fff">
            <Animated.View style={[styles.qaItems, {height: animQAHeight, opacity: animQAOpacity}]}>
              {renderQAItems()}
            </Animated.View>
            {HiddenQA}
          </Form>
        </View>
        <View style={[row, styles.review]}>
          <Form backgroundColor="#fff">
            <Animated.View style={{height: animReviewHeight, minHeight: defaultParams.reviewParams.minHeight}}>
              <Text style={styles.reviewText}>{renderReview()}</Text>
            </Animated.View>
            {HiddenReview}
            {Toggle}
          </Form>
        </View>
      </Animated.View>
    </Form>
  );
};

ViewAssessment.defaultProps = {
  username: '',
  avatar: undefined,
};

declare interface IViewAssessmentProps {
  rating: number;
  review: string;
  withTeacher: boolean;
  username?: string;
  avatar?: string;
  QAs: Array<{No: number; question: string; answer: number}>;
}

export default memo(ViewAssessment);
