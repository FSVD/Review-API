import { getStackInfo } from './root.connectors';
import { getUserData, addUser, updateUser } from '../user/user.connectors';
import { getSubjectData } from '../subject/subject.connectors';
import { getReviewData } from '../review/review.connectors';

export const resolvers = {
  Query: {
    stackInfo: () => getStackInfo(),
    userById: (obj, args, context, info) => getUserData(obj, args, context, info),
    users: (obj, args, context, info) => getUserData(obj, args, context, info),
    usersByFirstname: (obj, args, context, info) => getUserData(obj, args, context, info),
    usersByNewsletterAgree: (obj, args, context, info) => getUserData(obj, args, context, info),
    subjectById: (obj, args, context, info) => getSubjectData(obj, args, context, info),
    subjects: (obj, args, context, info) => getSubjectData(obj, args, context, info),
    subjectCategories: (obj, args, context, info) => getSubjectData(obj, args, context, info),
    subjectCategoryRatingCriterions: (obj, args, context, info) => getSubjectData(obj, args, context, info),
    ratingCriterions: (obj, args, context, info) => getSubjectData(obj, args, context, info),
    reviews: (obj, args, context, info) => getReviewData(obj, args, context, info),
    reviewEvaluations: (obj, args, context, info) => getReviewData(obj, args, context, info),
    reviewEvaluationsByReviewId: (obj, args, context, info) => getReviewData(obj, args, context, info),
  },
  Mutation: {
    addUser: (obj, args, context, info) => addUser(obj, args, context, info),
    updateUser: (obj, args, context, info) => updateUser(obj, args, context, info),
  },
};
