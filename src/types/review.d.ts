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
    userId: string;
    avatar?: string;
    username: string;
  };

  export type IActiveReviews = Array<IActiveReview>;

}
