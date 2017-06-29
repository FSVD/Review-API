import joinMonsterAdapt from 'join-monster-graphql-tools-adapter';
import executableSchema from '../schema';

const schemaMap = joinMonsterAdapt(executableSchema, {
  Query: {
    fields: {
      // add a function to generate the "where condition"
      userById: {
        where: (table, args) => `${table}.id = ${args.id}`
      },
      subjectById: {
        where: (table, args) => `${table}.id = ${args.id}`
      },
      allUsersByFirstname: {
        where: (table, args) => `${table}.first_name = '${args.firstName}'`
      },
      allUsersByNewsletterAgree: {
        where: (table, args) => `${table}.newsletter_agree = ${args.newsletterAgree}`
      },
    },
  },
});

export default schemaMap;
