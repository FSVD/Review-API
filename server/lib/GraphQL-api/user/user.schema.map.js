import joinMonsterAdapt from 'join-monster-graphql-tools-adapter';
import executableSchema from '../schema';

const schemaMap = joinMonsterAdapt(executableSchema, {
  User: {
    // map the User object type to its SQL table
    sqlTable: 'user',
    uniqueKey: 'id',
    // tag the User's fields
    fields: {
      username: {
        sqlColumn: 'username',
      },
      first_name: {
        sqlColumn: 'first_name',
      },
      last_name: {
        sqlColumn: 'last_name',
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
      newsletter_agree: {
        sqlColumn: 'newsletter_agree',
      },
      user_account_status: {
        sqlColumn: 'user_account_status',
      },
      reviews: {
        sqlJoin: (reviewTable, userTable) => `${userTable}.id = ${reviewTable}.user_id`,
      },
    },
  },
});

export default schemaMap;
