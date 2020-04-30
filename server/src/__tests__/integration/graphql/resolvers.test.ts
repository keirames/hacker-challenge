import { gql, ApolloServer } from "apollo-server-express";
const { createTestClient } = require("apollo-server-testing");
import { typeDefs } from "../../../graphql/schema";
import resolvers from "../../../graphql/resolvers";
import mongooseServer from "../../../db";

// Connect to mongoDB
mongooseServer();

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      username
      password
      firstname
      lastname
      totalPoints
      solvedChallenges {
        id
        title
        content
        level
        points
        contest {
          id
          name
          challenges {
            id
            title
          }
        }
        passedUser {
          id
          username
          password
          firstname
          lastname
          totalPoints
        }
      }
      likedChallenges {
        id
        title
        content
        level
        points
        contest {
          id
          name
          challenges {
            id
            title
          }
        }
        passedUser {
          id
          username
          password
          firstname
          lastname
          totalPoints
        }
      }
    }
  }
`;

const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      password
      firstname
      lastname
      totalPoints
      solvedChallenges {
        id
        title
        content
        level
        points
        contest {
          id
          name
          challenges {
            id
            title
          }
        }
        passedUser {
          id
          username
          password
          firstname
          lastname
          totalPoints
        }
      }
      likedChallenges {
        id
        title
        content
        level
        points
        contest {
          id
          name
          challenges {
            id
            title
          }
        }
        passedUser {
          id
          username
          password
          firstname
          lastname
          totalPoints
        }
      }
    }
  }
`;

const GET_CHALLENGE = gql`
  query GetChallenge($id: ID!) {
    getChallenge(id: $id) {
      id
      title
      content
      level
      points
      contest {
        id
        name
        challenges {
          id
        }
      }
      testCases {
        text
        testString
      }
      testInputs
      challengeSeed
      passedUser {
        id
        username
        password
        firstname
        lastname
        solvedChallenges {
          id
        }
        likedChallenges {
          id
        }
        totalPoints
      }
    }
  }
`;

const GET_CHALLENGES = gql`
  query GetChallenges {
    getChallenges {
      id
      title
      content
      level
      points
      contest {
        id
        name
        challenges {
          id
        }
      }
      testCases {
        text
        testString
      }
      testInputs
      challengeSeed
      passedUser {
        id
        username
        password
        firstname
        lastname
        solvedChallenges {
          id
        }
        likedChallenges {
          id
        }
        totalPoints
      }
    }
  }
`;

const GET_CONTESTS = gql`
  query GetContests {
    getContests {
      id
      name
      challenges {
        id
        title
        content
        level
        points
        contest {
          id
          name
          challenges {
            id
          }
        }
        testCases {
          text
          testString
        }
        testInputs
        challengeSeed
        passedUser {
          id
          username
          password
          firstname
          lastname
          solvedChallenges {
            id
          }
          likedChallenges {
            id
          }
          totalPoints
        }
      }
    }
  }
`;

const GET_CONTEST = gql`
  query GetContest($id: ID!) {
    getContest(id: $id) {
      id
      name
      challenges {
        id
        title
        content
        level
        points
        contest {
          id
          name
          challenges {
            id
          }
        }
        testCases {
          text
          testString
        }
        testInputs
        challengeSeed
        passedUser {
          id
          username
          password
          firstname
          lastname
          solvedChallenges {
            id
          }
          likedChallenges {
            id
          }
          totalPoints
        }
      }
    }
  }
`;

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const { query, mutate } = createTestClient(apolloServer);

describe("Queries", () => {
  describe("User", () => {
    it("should return all users", async () => {
      const res = await query({ query: GET_USERS });
      expect(res).toMatchSnapshot();
    });

    it("should return single user with provided ID", async () => {
      const res = await query({
        query: GET_USER,
        variables: { id: "5eaa773df4dcc728b76b00b7" },
      });
      expect(res).toMatchSnapshot();
    });
  });

  describe("Challenge", () => {
    it("should return all challenges", async () => {
      const res = await query({ query: GET_CHALLENGES });
      expect(res).toMatchSnapshot();
    });

    it("should return single challenge with provided ID", async () => {
      const res = await query({
        query: GET_CHALLENGE,
        variables: { id: "5eaa7d1effd50d33c34637a8" },
      });
      expect(res).toMatchSnapshot();
    });
  });

  describe("Contest", () => {
    it("should return all contests", async () => {
      const res = await query({
        query: GET_CONTESTS,
      });
      expect(res).toMatchSnapshot();
    });

    it("should return single contest with provided ID", async () => {
      const res = await query({
        query: GET_CONTEST,
        variables: { id: "5eaa779bf4dcc728b76b00bb" },
      });
      expect(res).toMatchSnapshot();
    });
  });
});
