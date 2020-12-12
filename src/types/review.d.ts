import {IGroups} from 'types/group';

declare module 'types/review' {
  export type IQAs = Array<{id: string; No: number; question: string; answer: number}>;

  export type IReview = {
    rating: number;
    review: string;
    QAs: IQAs;
    id: string;
  };
  export type IReviews = Array<IReview>;

  export type IActiveReview = {
    id: string;
    QAs: IQAs;
    teacherId: string;
    avatar?: string;
    username: string;
  };

  export type IActiveReviews = Array<IActiveReview>;

  export type ILeavedReview = {
    id: string;
    QAs: IQAs;
    teacherId: string;
    review: string;
    username: string;
    avatar?: string;
    rating: number;
  };

  export type ILeavedReviews = Array<ILeavedReview>;

  export type IGeneratedReview = {
    id: string;
    teacherId: string;
    username: string;
    avatar?: string;
    rating: number;
    groups: IGroups;
  };

  export type IGeneratedReviews = Array<IGeneratedReview>;
}
