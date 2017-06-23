import * as MocksModule from '../review/review.mocks';

// console.log(MocksModule.users);

export const resolvers = {
  Review: {
    review_evaluations: () => MocksModule.reviewEvaluation,
  },
};
