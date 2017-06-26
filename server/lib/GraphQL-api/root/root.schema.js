export const schema = [`
  type Query {
    getUsers: [User]
    getUsersJM: [User]
    getUsersJMwithArgs(id: Int): [User]
    getSubjects: [Subject]
    getCategories: [SubjectCategory]
    getReviews: [Review]
    getRatingCriterions: [RatingCriterion]
    getSubjectCategoryRatingCriterion: [SubjectCategoryRatingCriterion]
    getReviewEvaluation: [ReviewEvaluation]
  }
`];
