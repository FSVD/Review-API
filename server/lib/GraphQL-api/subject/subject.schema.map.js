import joinMonsterAdapt from 'join-monster-graphql-tools-adapter';
import executableSchema from '../schema';

const schemaMap = joinMonsterAdapt(executableSchema, {
  Query: {
    fields: {
      // add a function to generate the "where condition"
      subjectById: {
        where: (table, args) => `${table}.id = ${args.id}`,
      },
    },
  },

  Subject: {
    // map the Subject object type to its SQL table
    sqlTable: 'subject',
    uniqueKey: 'id',
    // tag the Subject's fields
    fields: {
      subjectCategoryId: {
        sqlColumn: 'subject_category_id',
      },
      googlePlacesReference: {
        sqlColumn: 'google_places_reference',
      },
      subjectCategory: {
        sqlJoin: (subjectTable, subjectCategoryTable) => `${subjectTable}.subject_category_id = ${subjectCategoryTable}.id`,
      },
      reviews: {
        sqlBatch: {
          thisKey: 'subject_id',
          parentKey: 'id',
        },
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
      ratingCriterions: {
        // sqlJoin: (subjectCategoryTable, ratingCriterionsTable) => `${subjectCategoryTable}.id = ${ratingCriterionsTable}.id`,
        junctionTable: 'subject_category_rating_criterion',
        junctionTableKey: ['subject_category_id', 'rating_criterion_id'],
        junctionBatch: {
          thisKey: 'subject_category_id',
          parentKey: 'id',
          sqlJoin: (subjectCategoryRatingCriterionTable, ratingCriterionTable) => `${subjectCategoryRatingCriterionTable}.rating_criterion_id = ${ratingCriterionTable}.id`,
        },
      },
      subjects: {
        // sqlJoin: (subjectCategoryTable, subjectTable) => `${subjectCategoryTable}.id = ${subjectTable}.id`,
        sqlBatch: {
          thisKey: 'subject_category_id',
          parentKey: 'id',
        },
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
      subjectCategories: {
        junctionTable: 'subject_category_rating_criterion',
        junctionTableKey: ['rating_criterion_id', 'subject_category_id'],
        junctionBatch: {
          thisKey: 'rating_criterion_id',
          parentKey: 'id',
          sqlJoin: (subjectCategoryRatingCriterionTable, subjectCategoryTable) => `${subjectCategoryRatingCriterionTable}.subject_category_id = ${subjectCategoryTable}.id`,
        },
      },
    },
  },

  SubjectCategoryRatingCriterion: {
    // map the SubjectCategoryRatingCriterion object type to its SQL table
    sqlTable: 'subject_category_rating_criterion',
    uniqueKey: 'id',
    // tag the SubjectCategoryRatingCriterion's fields
    fields: {
      subjectCategoryId: {
        sqlColumn: 'subject_category_id',
      },
      ratingCriterionId: {
        sqlColumn: 'rating_criterion_id',
      },
    },
  },
});

export default schemaMap;
