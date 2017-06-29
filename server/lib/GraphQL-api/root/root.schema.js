export const schema = [`
  type Query {
    userById(id: Int): User
    subjectById(id: Int): Subject
    allUsers: [User]
    allUsersByFirstname(firstName: String): [User]
    allUsersByNewsletterAgree(newsletterAgree: Boolean): [User]
    allSubjects: [Subject]
    allCategories: [SubjectCategory]
    allReviews: [Review]
    allRatingCriterions: [RatingCriterion]
    allSubjectCategoryRatingCriterion: [SubjectCategoryRatingCriterion]
    allReviewEvaluation: [ReviewEvaluation]
  }
`];
