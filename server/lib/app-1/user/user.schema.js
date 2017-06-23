export const schema = [`
  type User {
    id: Int!
    username: String
    first_name: String
    last_name: String
    password: String
    email: String
    city: String
    newsletter_agree: Boolean
    user_account_status: Int
    reviews: [Review]
  }
`];
