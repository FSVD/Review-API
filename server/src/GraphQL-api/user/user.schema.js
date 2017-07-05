export const schema = `
  type Query {
    userById(id: Int): User
    users: [User]
    usersByFirstname(firstName: String): [User]
    usersByNewsletterAgree(newsletterAgree: Boolean): [User]
  }

  type Mutation {
    addUser(
      username: String!
      firstName: String!
      lastName: String!
      password: String!
      email: String!
      city: String
      newsletterAgree: Boolean!
      userAccountStatus: Int!
    ): User
    
    updateUser(
      id: Int
      username: String!
      firstName: String!
      lastName: String!
      password: String!
      email: String!
      city: String
      newsletterAgree: Boolean!
      userAccountStatus: Int!
    ): User

    deleteUser(id: Int): User
  }
  
  type User {
    id: Int!
    username: String!
    firstName: String!
    lastName: String!
    fullName: String!
    password: String!
    email: String!
    city: String
    newsletterAgree: Boolean!
    userAccountStatus: Int!
    reviews: [Review]
  }
`;
