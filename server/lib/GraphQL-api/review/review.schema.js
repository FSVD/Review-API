export const schema = [`
  type Review {
    id: Int!
    user_id: Int
    subject_id: Int
    title(customTitle: String): String
    content(customContent: String): String
    review_status: Int
    review_evaluations: [ReviewEvaluation]
    author: User
    subject: Subject
    review_rating_criterions_values: [ReviewRatingCriterionValue]
  }

  type ReviewEvaluation {
    id: Int!
    type: Int
    user_id: Int
    review_id: Int
  }

  type ReviewRatingCriterionValue {
    id: Int!
    review_id: Int
    rating_criterion_id: Int
    value: Int
    rating_criterion: RatingCriterion
  }
`];
