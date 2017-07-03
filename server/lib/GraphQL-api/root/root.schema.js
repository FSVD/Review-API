export const schema = [`
  type Query {
    stackInfo: String
    userById(id: Int): User
    users: [User]
    usersByFirstname(firstName: String): [User]
    usersByNewsletterAgree(newsletterAgree: Boolean): [User]
    subjectById(id: Int): Subject
    subjects: [Subject]
    subjectCategories: [SubjectCategory]
    subjectCategoryRatingCriterions: [SubjectCategoryRatingCriterion]
    ratingCriterions: [RatingCriterion]
    reviews: [Review]
    reviewEvaluations: [ReviewEvaluation]
    reviewEvaluationsByReviewId(reviewId: Int): [ReviewEvaluation]
  }

  type Mutation {
    addUser(
      username: String!
      firstName: String!
      lastName: String!
      password: String!
      email: String!
      city: String
      newsletterAgree: Boolean!
      userAccountStatus: Int!
    ): User
    
    updateUser(
      id: Int
      username: String!
      firstName: String!
      lastName: String!
      password: String!
      email: String!
      city: String
      newsletterAgree: Boolean!
      userAccountStatus: Int!
    ): User
  }
`];
