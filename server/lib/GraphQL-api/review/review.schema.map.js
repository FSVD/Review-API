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
});

export default schemaMap;
