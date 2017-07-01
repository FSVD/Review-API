export const schema = [`
  type Subject {
    id: Int!
    subjectCategoryId: Int
    googlePlacesReference: String
    subjectCategory: SubjectCategory
    reviews: [Review]
  }

  type SubjectCategory {
    id: Int!
    name: String
    ratingCriterions: [RatingCriterion]
    subjects: [Subject]
  }

  type RatingCriterion {
    id: Int!
    name: String
    subjectCategories: [SubjectCategory]
  }

  type SubjectCategoryRatingCriterion {
    id: Int!
    subjectCategoryId: Int
    ratingCriterionId: Int
  }
`];
