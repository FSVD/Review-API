import { stringifyType } from './review.connectors';

export const resolvers = {
  Review: {},
  ReviewEvaluation: {
    stringifiedType: (obj, args, context, info) => stringifyType(obj, args, context, info),
  },
  ReviewRatingCriterionValue: {},
};
