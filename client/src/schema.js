export const typeDefs = `

type Query {
  subjects: [Subject]
}

type Subject {
  id: ID!
  googlePlacesReference: String
}

`