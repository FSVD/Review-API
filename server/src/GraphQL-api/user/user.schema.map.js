import joinMonsterAdapt from 'join-monster-graphql-tools-adapter';
import executableSchema from '../schema';

const schemaMap = joinMonsterAdapt(executableSchema, {
  Query: {
    fields: {
      // add a function to generate the "where condition"
      userById: {
        where: (table, args) => `${table}.id = ${args.id}`,
      },
      usersByFirstname: {
        where: (table, args) => `${table}.first_name = '${args.firstName}'`,
      },
      usersByNewsletterAgree: {
        where: (table, args) => `${table}.newsletter_agree = ${args.newsletterAgree}`,
      },
    },
  },

  User: {
    // map the User object type to its SQL table
    sqlTable: 'user',
    uniqueKey: 'id',
    // tag the User's fields
    fields: {
      username: {
        sqlColumn: 'username',
      },
      firstName: {
        sqlColumn: 'first_name',
      },
      lastName: {
        sqlColumn: 'last_name',
      },
      fullName: {
        sqlDeps: ['first_name', 'last_name'],
      },
      password: {
        sqlColumn: 'password',
      },
      email: {
        sqlColumn: 'email',
      },
      city: {
        sqlColumn: 'city',
      },
      newsletterAgree: {
        sqlColumn: 'newsletter_agree',
      },
      userAccountStatus: {
        sqlColumn: 'user_account_status',
      },
      reviews: {
        sqlJoin: (userTable, reviewTable) => `${userTable}.id = ${reviewTable}.user_id`,
      },
    },
  },
});

export default schemaMap;
