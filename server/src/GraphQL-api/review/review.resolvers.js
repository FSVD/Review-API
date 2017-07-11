import {
  pubsub,
  stringifyReviewEvaluationType,
  getReviewData,
  addReview,
  deleteReview,
} from './review.connectors';

export const resolvers = {
  Query: {
    reviewById: (obj, args, context, info) => getReviewData(obj, args, context, info),
    reviews: (obj, args, context, info) => getReviewData(obj, args, context, info),
    reviewEvaluations: (obj, args, context, info) => getReviewData(obj, args, context, info),
    reviewEvaluationsByReviewId: (obj, args, context, info) => getReviewData(obj, args, context, info),
  },

  Mutation: {
    addReview: (obj, args, context, info) => addReview(obj, args, context, info),
    deleteReview: (obj, args, context, info) => deleteReview(obj, args, context, info),
  },

  Subscription: {
    reviewAdded: { subscribe: () => pubsub.asyncIterator('commentAdded') },
  },

  Review: {},

  ReviewEvaluation: {
    reviewEvaluationStringifiedType: (obj, args, context, info) => stringifyReviewEvaluationType(obj, args, context, info),
  },

  ReviewRatingCriterionValue: {},
};
