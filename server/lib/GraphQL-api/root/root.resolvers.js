import { rootConnector } from './root.connectors';

export const resolvers = {
  Query: {
    getUsersJM: (obj, args, context, info) => rootConnector(obj, args, context, info),
    getUsersJMwithArgs: (obj, args, context, info) => rootConnector(obj, args, context, info),
    getSubjectsJM: (obj, args, context, info) => rootConnector(obj, args, context, info),
    getCategoriesJM: (obj, args, context, info) => rootConnector(obj, args, context, info),
    getReviewsJM: (obj, args, context, info) => rootConnector(obj, args, context, info),
    getRatingCriterionsJM: (obj, args, context, info) => rootConnector(obj, args, context, info),
    getSubjectCategoryRatingCriterionJM: (obj, args, context, info) => rootConnector(obj, args, context, info),
    getReviewEvaluationJM: (obj, args, context, info) => rootConnector(obj, args, context, info),
  },
};
