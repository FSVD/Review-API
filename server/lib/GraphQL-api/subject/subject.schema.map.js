import joinMonsterAdapt from 'join-monster-graphql-tools-adapter';
import executableSchema from '../schema';

const schemaMap = joinMonsterAdapt(executableSchema, {
  Subject: {
    // map the Subject object type to its SQL table
    sqlTable: 'subject',
    uniqueKey: 'id',
    // tag the Subject's fields
    fields: {
      category_id: {
        sqlColumn: 'category_id',
      },
      google_places_reference: {
        sqlColumn: 'google_places_reference',
      },
      category: {
        sqlJoin: (categoryTable, subjectTable) => `${categoryTable}.category_id = ${subjectTable}.id`,
      },
      reviews: {
        sqlJoin: (reviewTable, subjectTable) => `${reviewTable}.id = ${subjectTable}.id`,
      },
    },
  },
  SubjectCategory: {
    // map the SubjectCategory object type to its SQL table
    sqlTable: 'subject_category',
    uniqueKey: 'id',
    // tag the SubjectCategory's fields
    fields: {
      name: {
        sqlColumn: 'name',
      },
      rating_criterions: {
        sqlJoin: (subjectCategoryTable, ratingCriterionsTable) => `${subjectCategoryTable}.id = ${ratingCriterionsTable}.id`,
      },
      subjects: {
        sqlJoin: (subjectCategoryTable, subjectTable) => `${subjectCategoryTable}.id = ${subjectTable}.id`,
      },
    },
  },
  RatingCriterion: {
    // map the RatingCriterion object type to its SQL table
    sqlTable: 'rating_criterion',
    uniqueKey: 'id',
    // tag the RatingCriterion's fields
    fields: {
      name: {
        sqlColumn: 'name',
      },
      subject_categories: {
        sqlJoin: (categoryTable, ratingCriterionsTable) => `${categoryTable}.category_id = ${ratingCriterionsTable}.id`,
      },
    },
  },
  SubjectCategoryRatingCriterion: {
    // map the SubjectCategoryRatingCriterion object type to its SQL table
    sqlTable: 'subject_category_rating_criterion',
    uniqueKey: 'id',
    // tag the SubjectCategoryRatingCriterion's fields
    fields: {
      subject_category_id: {
        sqlColumn: 'subject_category_id',
      },
      rating_criterion_id: {
        sqlColumn: 'rating_criterion_id',
      },
    },
  },
});

export default schemaMap;
