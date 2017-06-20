import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `

type User {
  id: ID!
  username: String
  firstname: String
  lastname: String
  password: String
  email: String
  city: String
  newsletteragree: String
  userstatus: String
}

type Subject {
  id: ID!
  categoryid: String
  googleplacesreference: String
}

type SubjectCategory {
  id: ID!
  name: String
}

type Query {
  users: [User],
  subjects: [Subject],
  categories: [SubjectCategory]
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
// addMockFunctionsToSchema({ schema });
export { schema };
