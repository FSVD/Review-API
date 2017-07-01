import joinMonsterAdapt from 'join-monster-graphql-tools-adapter';
import executableSchema from '../schema';

const schemaMap = joinMonsterAdapt(executableSchema, {
  Query: {
    fields: {
      // add a function to generate the "where condition"
      userById: {
        where: (table, args) => `${table}.id = ${args.id}`
      },
      usersByFirstname: {
        where: (table, args) => `${table}.first_name = '${args.firstName}'`
      },
      usersByNewsletterAgree: {
        where: (table, args) => `${table}.newsletter_agree = ${args.newsletterAgree}`
      },
      subjectById: {
        where: (table, args) => `${table}.id = ${args.id}`
      },
      reviewEvaluationsByReviewId: {
        where: (table, args) => `${table}.review_id = ${args.reviewId}`
      },
    },
  },
});

export default schemaMap;
