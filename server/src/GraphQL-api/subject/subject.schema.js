export const schema = `
  type Query {
    subjectById(id: Int): Subject
    subjectByGooglePlacesReference(googlePlacesReference: String): Subject
    subjects: [Subject]
    subjectCategoryById(id:Int): SubjectCategory
    subjectCategories: [SubjectCategory]
    ratingCriterionById(id:Int): RatingCriterion
    ratingCriterions: [RatingCriterion]
  }

  type Mutation {
    deleteSubjectCategory(id: Int): SubjectCategory
    deleteRatingCriterion(id: Int): RatingCriterion
  }

  type Subject {
    id: Int!
    subjectCategoryId: Int
    googlePlacesReference: String
    subjectCategory: SubjectCategory
    reviews: [Review]
    ratingCriterionsValuesAverage: [RatingCriterionValuesAverage]
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

  type RatingCriterionValuesAverage {
    ratingCriterionId: Int
    ratingCriterionName: String
    totalValuesCount: Int
    valuesAverage: Float
  }
`;
