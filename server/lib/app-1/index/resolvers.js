import * as UserMocksModule from '../user/user.mocks';
import * as SubjectMocksModule from '../subject/subject.mock';
import * as ReviewMocksModule from '../review/review.mocks';

// console.log(MocksModule.users);

export const resolvers = {
  Query: {
    getUsers: () => UserMocksModule.users,
    getSubjects: () => SubjectMocksModule.subjects,
    getCategories: () => SubjectMocksModule.categories,
    getReviews: () => ReviewMocksModule.reviews,
    getRatingCriterions: () => SubjectMocksModule.retingCriterions,
    getSubjectCategoryRatingCriterion: () => SubjectMocksModule.subjectCategoryRatingCriterion,
    getReviewEvaluation: () => ReviewMocksModule.reviewEvaluation,
  },
};
