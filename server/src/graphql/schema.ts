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

  type TestCase {
    text: String!
    testString: String!
  }

  type Content {
    problem: String
    inputSample: String
    outputSample: String
  }

  type TestedResultError {
    message: String!
    actual: Int!
    expected: Int!
  }

  type TestedResult {
    passed: Boolean!
    assert: TestedResultError
  }

  type Answer {
    testedResults: [TestedResult!]!
  }

  type Challenge {
    id: ID!
    title: String!
    slug: String!
    content: Content!
    level: String!
    points: Int!
    contest: Contest!
    testCases: [TestCase!]!
    testInputs: [String!]!
    challengeSeed: String!
    passedUser: [User!]!
  }

  # Noone can get password of an user
  type User {
    id: ID!
    username: String!
    # password: String
    firstname: String!
    lastname: String!
    solvedChallenges: [Challenge!]!
    likedChallenges: [Challenge!]!
    totalPoints: Int!
  }

  type Contest {
    id: ID!
    name: String!
    slug: String!
    challenges: [Challenge!]!
  }

  input UserInput {
    username: String!
    password: String!
    firstname: String!
    lastname: String!
  }

  input TestCaseInput {
    text: String!
    testString: String!
  }

  input ContentInput {
    problem: String
    inputSample: String
    outputSample: String
  }

  input ChallengeInput {
    title: String!
    content: ContentInput!
    level: String!
    points: Int!
    contestId: ID!
    testCases: [TestCaseInput!]!
    testInputs: [String!]!
    challengeSeed: String!
  }

  input ContestInput {
    name: String!
  }

  # getUser & getChallenge dont throw error if id wrong
  type Query {
    getChallenge(slug: String!): Challenge
    getChallenges: [Challenge!]!
    getUser(id: ID!): User
    getUsers: [User!]!
    getMe: User!
    getContest(slug: String!): Contest!
    getContests: [Contest!]!
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
    submitAnswer(challengeId: ID!, answer: String!): Answer!
  }
`;
