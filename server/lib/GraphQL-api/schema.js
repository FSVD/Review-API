import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { makeExecutableSchema } from 'graphql-tools';

import { schema as UserSchema } from './user/user.schema';
import { schema as ReviewSchema } from './review/review.schema';
import { schema as SubjectSchema } from './subject/subject.schema';

import { resolvers as UserResolvers } from './user/user.resolvers';
import { resolvers as SubjectResolvers } from './subject/subject.resolvers';
import { resolvers as ReviewResolvers } from './review/review.resolvers';

const schema = mergeTypes([UserSchema, ReviewSchema, SubjectSchema]);
const resolvers = mergeResolvers([UserResolvers, SubjectResolvers, ReviewResolvers]);

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
