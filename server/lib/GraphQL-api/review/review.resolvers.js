import { typeToString } from './review.connectors';

export const resolvers = {
  Review: {},
  ReviewEvaluation: {
    typeMeaning: (obj, args, context, info) => typeToString(obj, args, context, info),
  },
  ReviewRatingCriterionValue: {},
};
