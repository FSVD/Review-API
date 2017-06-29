import { rootConnector } from './root.connectors';

export const resolvers = {
  Query: {
    userById: (obj, args, context, info) => rootConnector(obj, args, context, info),
    subjectById: (obj, args, context, info) => rootConnector(obj, args, context, info),
    allUsers: (obj, args, context, info) => rootConnector(obj, args, context, info),
    allUsersByFirstname: (obj, args, context, info) => rootConnector(obj, args, context, info),
    allUsersByNewsletterAgree: (obj, args, context, info) => rootConnector(obj, args, context, info),
    allSubjects: (obj, args, context, info) => rootConnector(obj, args, context, info),
    allCategories: (obj, args, context, info) => rootConnector(obj, args, context, info),
    allReviews: (obj, args, context, info) => rootConnector(obj, args, context, info),
    allRatingCriterions: (obj, args, context, info) => rootConnector(obj, args, context, info),
    allSubjectCategoryRatingCriterion: (obj, args, context, info) => rootConnector(obj, args, context, info),
    allReviewEvaluation: (obj, args, context, info) => rootConnector(obj, args, context, info),
  },
};
