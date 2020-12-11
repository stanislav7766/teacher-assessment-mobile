import {IGroups} from 'types/group';
import {IActiveReviews, ILeavedReviews, IQAs} from 'types/review';

export type IFetchLeaveReviewPayload = {
  userId: string;
  activeReviewId: string;
  review: string;
  QAs: IQAs;
};

export type IStudentReviews = {
  active: IActiveReviews;
  leaved: ILeavedReviews;
};

export type IFetchStudentReviewsPayload = {
  studentId: string;
};

export type IFetchActiveReviewPayload = {
  userId: string;
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
