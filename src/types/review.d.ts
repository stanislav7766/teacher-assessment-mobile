declare module 'types/review' {
  export type IQAs = Array<{No: number; question: string; answer: number}>;

  export type IReview = {
    rating: number;
    review: string;
    QAs: IQAs;
    id: string;
  };
  export type IReviews = Array<IReview>;
}
