// import * as MocksModule from '../review/review.mocks';
// import * as Connectors from './review.connectors';

import { reviewConnector } from './review.connectors';

// console.log(MocksModule.users);

/* export const resolvers = {
  Review: {
    title(root, args, context) {
      return Connectors.setTitle(args.customTitle);
    },
    content(root, args, context) {
      return Connectors.setContent(args.customContent);
    },
    review_evaluations: () => MocksModule.reviewEvaluation,
  },
};*/

export const resolvers = {
  Review: {
    review_evaluations: (obj, args, context, info) => reviewConnector(obj, args, context, info),
    author: (obj, args, context, info) => reviewConnector(obj, args, context, info),
    subject: (obj, args, context, info) => reviewConnector(obj, args, context, info),
  },
};
