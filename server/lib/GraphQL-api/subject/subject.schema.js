export const schema = [`
  type Subject {
    id: Int!
    category_id: String
    google_places_reference: String
    category: SubjectCategory
    reviews: [Review]
  }

  type SubjectCategory {
    id: Int!
    name: String
    rating_criterions: [RatingCriterion]
    subjects: [Subject]
  }

  type RatingCriterion {
    id: Int!
    name: String
    subjectCategories: [SubjectCategory]
  }

  type SubjectCategoryRatingCriterion {
    id: Int!
    subject_category_id: Int
    rating_criterion_id: Int
  }
`];
