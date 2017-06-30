import joinMonsterAdapt from 'join-monster-graphql-tools-adapter';
import executableSchema from '../schema';

const schemaMap = joinMonsterAdapt(executableSchema, {
  Review: {
    // map the Review object type to its SQL table
    sqlTable: 'review',
    uniqueKey: 'id',
    // tag the Review's fields
    fields: {
      user_id: {
        sqlColumn: 'user_id',
      },
      subject_id: {
        sqlColumn: 'subject_id',
      },
      title: {
        sqlColumn: 'title',
      },
      content: {
        sqlColumn: 'content',
      },
      review_status: {
        sqlColumn: 'review_status',
      },
      review_evaluations: {
        sqlBatch: {
          thisKey: 'review_id',
          parentKey: 'id',
        },
      },
      author: {
        sqlJoin: (userTable, reviewTable) => `${userTable}.user_id = ${reviewTable}.id`,
      },
      subject: {
        sqlJoin: (subjectTable, reviewTable) => `${subjectTable}.id = ${reviewTable}.id`,
      },
      review_rating_criterions_values: {
        sqlBatch: {
          thisKey: 'review_id',
          parentKey: 'id',
        },
      },
    },
  },
  ReviewEvaluation: {
    // map the ReviewEvaluation object type to its SQL table
    sqlTable: 'review_evaluation',
    uniqueKey: 'id',
    // tag the ReviewEvaluation's fields
    fields: {
      type: {
        sqlColumn: 'type',
      },
      user_id: {
        sqlColumn: 'user_id',
      },
      review_id: {
        sqlColumn: 'review_id',
      },
    },
  },
  ReviewRatingCriterionValue: {
    // map the ReviewRatingCriterionValue object type to its SQL table
    sqlTable: 'review_rating_criterion_value',
    uniqueKey: 'id',
    // tag the ReviewRatingCriterionValue's fields
    fields: {
      review_id: {
        sqlColumn: 'type',
      },
      rating_criterion_id: {
        sqlColumn: 'rating_criterion_id',
      },
      value: {
        sqlColumn: 'value',
      },
      rating_criterion: {
        sqlJoin: (ratingCriterionTable, reviewRatingCriterionValueTable) => `${ratingCriterionTable}.rating_criterion_id = ${reviewRatingCriterionValueTable}.id`,
      },
    },
  },
});

export default schemaMap;
