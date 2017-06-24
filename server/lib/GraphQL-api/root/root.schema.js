export const schema = [`
  type Query {
    getUsers: [User]
    getSubjects: [Subject]
    getCategories: [SubjectCategory]
    getReviews: [Review]
    getRatingCriterions: [RatingCriterion]
    getSubjectCategoryRatingCriterion: [SubjectCategoryRatingCriterion]
    getReviewEvaluation: [ReviewEvaluation]
  }
`];
