export const schema = [`
  type Review {
    id: Int!
    userId: Int
    subjectId: Int
    title(customTitle: String): String
    content(customContent: String): String
    reviewStatus: Int
    reviewEvaluations: [ReviewEvaluation]
    author: User
    subject: Subject
    reviewRatingCriterionsValues: [ReviewRatingCriterionValue]
  }

  type ReviewEvaluation {
    id: Int!
    type: Int
    typeMeaning: String
    userId: Int
    reviewId: Int
  }

  type ReviewRatingCriterionValue {
    id: Int!
    reviewId: Int
    ratingCriterionId: Int
    value: Int
    ratingCriterion: RatingCriterion
  }
`];
