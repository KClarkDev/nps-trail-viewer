const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    savedTrails: [Trail]
  }

  type Trail {
    _id: ID!
    trailName: String
    parkName: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUser: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveTrail(
      trailName: String
      parkName: String
    ): User
    removeTrail(_id: ID!): User
  }
`;

module.exports = typeDefs;
