const typeDefs = `

    input UserInput {
    email: String!
    password: String!
    }

    type User {
    email: String!
    password: String!
    }

    type Auth {
    token: ID!
    user: User
    }

    type Query {
    users: [User]
    user (userId: ID!): User
    }

    type Mutation {
    createUser(userData: UserInput!): Auth 
    login(email: String!, password: String!): Auth
    }
    
    
`;

module.exports = typeDefs;