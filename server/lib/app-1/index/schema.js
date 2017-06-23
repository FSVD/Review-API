import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import { schema as UserSchema } from '../user/user.schema';
import { schema as ReviewSchema } from '../review/review.schema';
import { schema as SubjectSchema } from '../subject/subject.schema';

import { resolvers as RootResolvers } from './resolvers';
import { resolvers as UserResolvers } from '../user/user.resolvers';
import { resolvers as SubjectResolvers } from '../subject/subject.resolvers';
import { resolvers as ReviewResolvers } from '../review/review.resolvers';

const RootSchema = [`
  type Query {
    getUsers: [User]
    getSubjects: [Subject]
    getCategories: [SubjectCategory]
    getReviews: [Review]
    getRatingCriterions: [RatingCriterion]
    getSubjectCategoryRatingCriterion: [SubjectCategoryRatingCriterion]
    getReviewEvaluation: [ReviewEvaluation]
  }
`];

const schema = [...RootSchema, ...UserSchema, ...ReviewSchema, ...SubjectSchema];
const resolvers = merge(RootResolvers, UserResolvers, SubjectResolvers, ReviewResolvers);

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
