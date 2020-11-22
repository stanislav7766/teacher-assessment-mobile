import {DEFAULT_INDENT} from '@constants/indent';

export default ({withTeacher}: {withTeacher: boolean}) => ({
  reviewParams: {minHeight: 20, maxHeight: 0, firstSet: true},
  assessmentParams: {minHeight: withTeacher ? 100 + DEFAULT_INDENT : 100, maxHeight: 0},
  QAParams: {minHeight: 0, maxHeight: 0, firstSet: true},
});
