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
    addSubject(
      subjectCategoryId: Int
      googlePlacesReference: String
    ): Subject
    deleteSubjectCategory(id: Int): SubjectCategory
    deleteRatingCriterion(id: Int): RatingCriterion
  }

  # This type represent a subject
  type Subject {
    # This is the subject id
    id: Int!
    # This is the subject category id
    subjectCategoryId: Int
    # This is the subject google places api reference
    googlePlacesReference: String
    # This is the subject category
    subjectCategory: SubjectCategory
    # These are the subject reviews
    reviews: [Review]
    # These are the subject criterions values average
    ratingCriterionsValuesAverage: [RatingCriterionValuesAverage]
  }

  # This type represent a subject category
  type SubjectCategory {
    # This is the subject category id
    id: Int!
    # This is the subject category name
    name: String
    # These are the subject category rating criterions
    ratingCriterions: [RatingCriterion]
    # These are the subjects witch belong to the category
    subjects: [Subject]
  }

  # This type represent a rating criterion
  type RatingCriterion {
    # This is the rating criterion id
    id: Int!
    # This is the rating criterion name
    name: String
    # These are the subject categories witch have this rating criterion
    subjectCategories: [SubjectCategory]
  }

  # This type represent the junction type between subject categories and rating criterions
  type SubjectCategoryRatingCriterion {
    # This is the junction id
    id: Int!
    # This is the subject category id
    subjectCategoryId: Int
    # This is the rating criterion id
    ratingCriterionId: Int
  }

  # This type represent a rating criterion value average for a subject
  type RatingCriterionValuesAverage {
    # This is the rating criterion id
    ratingCriterionId: Int
    # This is the rating criterion name
    ratingCriterionName: String
    # This is the rating criterion total values count
    totalValuesCount: Int
    # This is the rating criterion values average
    valuesAverage: Float
  }
`;
