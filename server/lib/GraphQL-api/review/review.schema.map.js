import joinMonsterAdapt from 'join-monster-graphql-tools-adapter';
import executableSchema from '../schema';

const schemaMap = joinMonsterAdapt(executableSchema, {
  Review: {
    // map the Review object type to its SQL table
    sqlTable: 'review',
    uniqueKey: 'id',
    // tag the Review's fields
    fields: {
      userId: {
        sqlColumn: 'user_id',
      },
      subjectId: {
        sqlColumn: 'subject_id',
      },
      title: {
        sqlColumn: 'title',
      },
      content: {
        sqlColumn: 'content',
      },
      reviewStatus: {
        sqlColumn: 'review_status',
      },
      reviewEvaluations: {
        sqlBatch: {
          thisKey: 'review_id',
          parentKey: 'id',
        },
      },
      author: {
        sqlJoin: (reviewTable, userTable) => `${reviewTable}.user_id = ${userTable}.id`,
      },
      subject: {
        sqlJoin: (reviewTable, subjectTable) => `${reviewTable}.subject_id = ${subjectTable}.id`,
      },
      reviewRatingCriterionsValues: {
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
      userId: {
        sqlColumn: 'user_id',
      },
      reviewId: {
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
      reviewId: {
        sqlColumn: 'type',
      },
      ratingCriterionId: {
        sqlColumn: 'rating_criterion_id',
      },
      value: {
        sqlColumn: 'value',
      },
      ratingCriterion: {
        sqlJoin: (reviewRatingCriterionValueTable, ratingCriterionTable) => `${reviewRatingCriterionValueTable}.rating_criterion_id = ${ratingCriterionTable}.id`,
      },
    },
  },
});

export default schemaMap;
