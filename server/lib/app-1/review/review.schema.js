export const schema = [`
  type Review {
    id: Int!
    user_id: Int
    subject_id: Int
    title: String
    content: String
    review_status: Int
    review_evaluations: [ReviewEvaluation]
    author: User
    subject: Subject
  }

  type ReviewEvaluation {
    id: Int!
    type: Int
    user_id: Int
    review_id: Int
  }
`];
