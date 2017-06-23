import * as MocksModule from '../review/review.mocks';
import * as Connectors from './review.connectors';

// console.log(MocksModule.users);

export const resolvers = {
  Review: {
    title(root, args, context) {
      return Connectors.setTitle(args.customTitle);
    },
    content(root, args, context) {
      return Connectors.setContent(args.customContent);
    },
    review_evaluations: () => MocksModule.reviewEvaluation,
  },
};
