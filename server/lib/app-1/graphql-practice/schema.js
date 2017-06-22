import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `

type User {
  id: Int!
  username: String
  firstname: String
  lastname: String
  password: String
  email: String
  city: String
  newsletteragree: Boolean
  userstatus: Boolean
}

type Subject {
  id: Int!
  categoryid: String
  googleplacesreference: String
}

type SubjectCategory {
  id: Int!
  name: String
}

type Query {
  getUsers: [User],
  getSubjects: [Subject],
  getCategories: [SubjectCategory]
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
// addMockFunctionsToSchema({ schema });
export { schema };
