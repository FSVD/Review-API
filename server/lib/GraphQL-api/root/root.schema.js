export const schema = [`
  type Query {
    getUsersJM: [User]
    getUsersJMwithArgs(id: Int): [User]
    getSubjectsJM: [Subject]
    getSubjectsJMwithArgs(id: Int): [Subject]
    getCategoriesJM: [SubjectCategory]
    getReviewsJM: [Review]
    getRatingCriterionsJM: [RatingCriterion]
    getSubjectCategoryRatingCriterionJM: [SubjectCategoryRatingCriterion]
    getReviewEvaluationJM: [ReviewEvaluation]
  }
`];
