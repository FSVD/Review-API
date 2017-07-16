export const schema = `
  type Query {
    review(id: Int): Review
    reviews: [Review]
    reviewEvaluations: [ReviewEvaluation]
    reviewEvaluationsByReviewId(reviewId: Int): [ReviewEvaluation]
  }

  type Mutation {
    addReview(
      userId: Int
      subjectId: Int
      title: String
      content: String
      reviewStatus: Int
      reviewRatingCriterionsValues: [ReviewRatingCriterionValueInput]
    ): Review

    deleteReview(id: Int): Review
  }

  type Subscription {
    reviewAdded: Review
  }

  # This type represent a review
  type Review {
    # This is the review id
    id: Int!
    # This is the user id of the author
    userId: Int
    # This is the subject id witch recived the review
    subjectId: Int
    # This is the review title
    title: String
    # This is the review content
    content: String
    # This is the review status witch could be pending, approved or rejected
    reviewStatus: Int
    # These are the review users evaluations
    reviewEvaluations: [ReviewEvaluation]
    # This is the review author
    author: User
    # This is the review subject
    subject: Subject
    # These are the review rating criterions values
    reviewRatingCriterionsValues: [ReviewRatingCriterionValue]
    # This is the review creation date
    createdAt: String
    # This is the review update date
    updatedAt: String
  }

  # This type represent a review evaluation
  type ReviewEvaluation {
    # This is the review evaluation id
    id: Int!
    # This is the review numeric value type
    type: Int
    # This is the review stringified value type witch could be "like", "dislike" etc.
    reviewEvaluationStringifiedType: String
    # This is the user id of the user who express a review evaluation
    userId: Int
    # This is the review id witch belongs the evaluation
    reviewId: Int
  }

  # This type represent a value of a review rating criterion
  type ReviewRatingCriterionValue {
    # This is the review rating criterion value id
    id: Int!
    # This is the review id
    reviewId: Int
    # This is the rating criterion id
    ratingCriterionId: Int
    # This is the rating criterion value
    value: Int
    # This is the rating criterion
    ratingCriterion: RatingCriterion
  }

  # This type represent the review rating criterion value input used for mutations
  input ReviewRatingCriterionValueInput {
    # This is the rating criterion id
    ratingCriterionId: Int
    # This is the rating criterion value
    value: Int
  }
`;
