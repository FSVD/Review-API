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
      reviews: {
        sqlJoin: (reviewTable, subjectTable) => `${subjectTable}.id = ${reviewTable}.subject_id`,
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
      subjects: {
        sqlJoin: (subjectCategoryTable, subjectTable) => `${subjectCategoryTable}.id = ${subjectTable}.category_id`,
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
