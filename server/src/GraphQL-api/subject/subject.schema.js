export const schema = `
  type Query {
    subjectById(id: Int): Subject
    subjects: [Subject]
    subjectCategories: [SubjectCategory]
    subjectCategoryRatingCriterions(subjectCategoryId: Int): [SubjectCategoryRatingCriterion]
    ratingCriterions: [RatingCriterion]
    ratingCriterionSubjectCategories(ratingCriterionId: Int): [SubjectCategoryRatingCriterion]
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
`;
