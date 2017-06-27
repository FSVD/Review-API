export const schema = [`
  type Query {
    # getUsers: [User]
    getUsersJM: [User]
    getUsersJMwithArgs(id: Int): [User]
    getSubjectsJM: [Subject]
    getCategoriesJM: [SubjectCategory]
    getReviewsJM: [Review]
    getRatingCriterionsJM: [RatingCriterion]
    getSubjectCategoryRatingCriterionJM: [SubjectCategoryRatingCriterion]
    getReviewEvaluationJM: [ReviewEvaluation]
  }
`];
