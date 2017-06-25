import joinMonster from 'join-monster';
import joinMonsterAdapt from 'join-monster-graphql-tools-adapter';
import schema from './user.schema';

export const schemaMap = joinMonsterAdapt(schema, {
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
        sqlJoin: (userTable, reviewTable) => `${userTable}.id = ${reviewTable}.user_id`,
      },
    },
  },
});
