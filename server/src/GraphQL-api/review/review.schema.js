export const schema = `
  type Query {
    reviewById(id: Int): Review
    reviews: [Review]
    reviewEvaluations: [ReviewEvaluation]
    reviewEvaluationsByReviewId(reviewId: Int): [ReviewEvaluation]
  }

  type Mutation {
    addReview(
      userId: Int!
      subjectId: Int!
      title: String!
      content: String!
      reviewRatingCriterionsValues: [ReviewRatingCriterionValueInput]!
    ): Review
  }

  type Review {
    id: Int!
    userId: Int
    subjectId: Int
    title: String
    content: String
    reviewStatus: Int
    reviewEvaluations: [ReviewEvaluation]
    author: User
    subject: Subject
    reviewRatingCriterionsValues: [ReviewRatingCriterionValue]
  }

  type ReviewEvaluation {
    id: Int!
    type: Int
    reviewEvaluationStringifiedType: String
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

  input ReviewRatingCriterionValueInput {
    ratingCriterionId: Int
    value: Int
  }
`;
