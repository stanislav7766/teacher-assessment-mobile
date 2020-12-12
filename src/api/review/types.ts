import {IGroups} from 'types/group';
import {IActiveReviews, ILeavedReviews, IQAs} from 'types/review';

export type IFetchLeaveReviewPayload = {
  teacherId: string;
  activeReviewId: string;
  review: string;
  QAs: IQAs;
};

export type IStudentReviews = {
  active: IActiveReviews;
  leaved: ILeavedReviews;
};

export type IFetchActiveReviewPayload = {
  teacherId: string;
};

export type IFetchReviewsPayload = {
  teacherId: string;
};

export type IFetchDeleteGeneratedReviewPayload = {
  reviewId: string;
};

export type IFetchAddFacultyReviewPayload = {
  teacherUsername: string;
  groups: IGroups;
};
