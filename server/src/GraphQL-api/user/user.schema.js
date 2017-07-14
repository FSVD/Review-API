export const schema = `
  type Query {
    userById(id: Int): User
    users: [User]
    usersByFirstname(firstName: String): [User]
    usersByNewsletterAgree(newsletterAgree: Boolean): [User]
  }

  type Mutation {
    addUser(
      username: String
      firstName: String
      lastName: String
      password: String
      email: String!
      city: String
      newsletterAgree: Boolean
      userAccountStatus: Int
    ): User
    
    updateUser(
      id: Int!
      username: String
      firstName: String
      lastName: String
      password: String
      email: String
      city: String
      newsletterAgree: Boolean
      userAccountStatus: Int
    ): User

    deleteUser(id: Int!): User
  }
  
  # This type represent a user
  type User {
    # This is the user id
    id: Int!
    # This is the user username
    username: String
    # This is the user first name
    firstName: String
    # This is the user last name
    lastName: String
    # This is the user full name
    fullName: String
    # This is the user password
    password: String
    # This is the user email address
    email: String
    # This is the user city
    city: String
    # This is the user newsletter agreement
    newsletterAgree: Boolean
    # This is the user account status witch could be pending, confirmed or inactive
    userAccountStatus: Int
    # These are the user reviews
    reviews: [Review]
  }
`;
