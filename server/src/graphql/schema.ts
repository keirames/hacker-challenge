const { gql } = require("apollo-server-express");

export const typeDefs = gql`
  # interface MutationResponse {
  #   code: String!
  #   success: Boolean!
  #   message: String!
  # }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Challenge {
    id: ID!
    title: String!
    content: String!
    level: String!
    points: Int!
    contest: Contest!
    passedUser: [User!]!
  }

  type User {
    id: ID!
    username: String!
    password: String
    firstname: String!
    lastname: String!
    solvedChallenges: [Challenge!]!
    likedChallenges: [Challenge!]!
    totalPoints: Int!
  }

  type Contest {
    id: ID!
    name: String!
    challenges: [Challenge!]!
  }

  type Query {
    getChallenge(id: ID!): Challenge
    getChallenges: [Challenge!]!
    getUser(id: ID!): User
    getUsers: [User!]!
    getContest: Contest!
    getContests: [Contest!]!
  }

  input UserInput {
    username: String!
    password: String!
    firstname: String!
    lastname: String!
  }

  input ChallengeInput {
    title: String!
    content: String!
    level: String!
    contestId: ID!
  }

  input ContestInput {
    name: String!
  }

  type Mutation {
    login(username: String!, password: String!): String!
    register(user: UserInput!): AuthPayload!
    editUser(userId: ID!, user: UserInput!): User!
    addChallenge(challenge: ChallengeInput!): Challenge!
    editChallenge(challengeId: ID!, challenge: ChallengeInput!): Challenge!
    addOrRemoveSolvedChallenges(userId: ID!, challengeId: ID!): [ID!]!
    addOrRemoveLikedChallenges(userId: ID!, challengeId: ID!): [ID!]!
    addContest(contest: ContestInput!): Contest!
    editContest(contestId: ID!, contest: ContestInput!): Contest!
    submitAnswer(challengeId: ID!, answer: String!): [String]!
  }
`;
