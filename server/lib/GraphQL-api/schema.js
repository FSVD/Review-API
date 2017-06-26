import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import joinMonsterAdapt from 'join-monster-graphql-tools-adapter';

import { schema as RootSchema } from './root/root.schema';
import { schema as UserSchema } from './user/user.schema';
import { schema as ReviewSchema } from './review/review.schema';
import { schema as SubjectSchema } from './subject/subject.schema';

import { resolvers as RootResolvers } from './root/root.resolvers';
import { resolvers as UserResolvers } from './user/user.resolvers';
import { resolvers as SubjectResolvers } from './subject/subject.resolvers';
import { resolvers as ReviewResolvers } from './review/review.resolvers';

const schema = [...RootSchema, ...UserSchema, ...ReviewSchema, ...SubjectSchema];
const resolvers = merge(RootResolvers, UserResolvers, SubjectResolvers, ReviewResolvers);

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

joinMonsterAdapt(executableSchema, {
  Query: {
    fields: {
      // add a function to generate the "where condition"
      getUsersJMwithArgs: {
        where: (table, args) => `${table}.id = ${args.id}`
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

export default executableSchema;
