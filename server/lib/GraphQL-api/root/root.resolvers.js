// import * as UserMocksModule from '../user/user.mocks';
// import * as SubjectMocksModule from '../subject/subject.mock';
// import * as ReviewMocksModule from '../review/review.mocks';

import { getUsers, rootConnector } from './root.connectors';

// console.log(MocksModule.users);

export const resolvers = {
  Query: {
    getUsers: () => getUsers(),
    getUsersJM: (obj, args, context, info) => rootConnector(obj, args, context, info),
    getUsersJMwithArgs: (obj, args, context, info) => rootConnector(obj, args, context, info),
    getSubjects: (obj, args, context, info) => rootConnector(obj, args, context, info),
    getCategories: (obj, args, context, info) => rootConnector(obj, args, context, info),
    getReviews: (obj, args, context, info) => rootConnector(obj, args, context, info),
    getRatingCriterions: (obj, args, context, info) => rootConnector(obj, args, context, info),
    getSubjectCategoryRatingCriterion: (obj, args, context, info) => rootConnector(obj, args, context, info),
    getReviewEvaluation: (obj, args, context, info) => rootConnector(obj, args, context, info),
  },
};
