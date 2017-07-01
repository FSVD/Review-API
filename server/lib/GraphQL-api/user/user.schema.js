export const schema = [`
  type User {
    id: Int!
    username: String
    firstName: String
    lastName: String
    fullName: String
    password: String
    email: String
    city: String
    newsletterAgree: Boolean
    userAccountStatus: Int
    reviews: [Review]
  }
`];
