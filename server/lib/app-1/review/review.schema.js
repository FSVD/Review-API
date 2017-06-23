export const schema = [`
  type Review {
    id: Int!
    user_id: Int
    subject_id: Int
    title(customTitle: String): String
    content(customContent: String): String
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
