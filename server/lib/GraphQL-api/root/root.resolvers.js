import * as UserMocksModule from '../user/user.mocks';
import * as SubjectMocksModule from '../subject/subject.mock';
import * as ReviewMocksModule from '../review/review.mocks';

import { getUsers, getUsersJM } from './root.connectors';

// console.log(MocksModule.users);

export const resolvers = {
  Query: {
    getUsers: () => getUsers(),
    getUsersJM: (obj, args, context, info) => getUsersJM(obj, args, context, info),
    getUsersJMwithArgs: (obj, args, context, info) => getUsersJM(obj, args, context, info),
    getSubjects: () => SubjectMocksModule.subjects,
    getCategories: () => SubjectMocksModule.categories,
    getReviews: () => ReviewMocksModule.reviews,
    getRatingCriterions: () => SubjectMocksModule.retingCriterions,
    getSubjectCategoryRatingCriterion: () => SubjectMocksModule.subjectCategoryRatingCriterion,
    getReviewEvaluation: () => ReviewMocksModule.reviewEvaluation,
  },
};
