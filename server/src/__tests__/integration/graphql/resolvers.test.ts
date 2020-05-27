import { gql, ApolloServer } from "apollo-server-express";
const { createTestClient } = require("apollo-server-testing");
import { typeDefs } from "../../../graphql/schema";
import resolvers from "../../../graphql/resolvers";
import mongooseServer from "../../../db";
import { constructTestServer } from "../../__utils";
import * as auth from "../../../utils/auth";
import { User } from "../../../models/user";
import { sign } from "jsonwebtoken";

// Connect to mongoDB
mongooseServer();

//TODO: Do i need customize those graphql call
const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      username
      firstname
      lastname
      totalPoints
      solvedChallenges {
        id
        title
        content {
          problem
          inputSample
          outputSample
        }
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
          firstname
          lastname
          totalPoints
        }
      }
      likedChallenges {
        id
        title
        content {
          problem
          inputSample
          outputSample
        }
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
      firstname
      lastname
      totalPoints
      solvedChallenges {
        id
        title
        content {
          problem
          inputSample
          outputSample
        }
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
          firstname
          lastname
          totalPoints
        }
      }
      likedChallenges {
        id
        title
        content {
          problem
          inputSample
          outputSample
        }
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
      content {
        problem
        inputSample
        outputSample
      }
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
      content {
        problem
        inputSample
        outputSample
      }
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
        content {
          problem
          inputSample
          outputSample
        }
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
        content {
          problem
          inputSample
          outputSample
        }
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
      const { server } = constructTestServer({
        context: async () => {
          //! Create generateToken for user schema (refactor)
          //! Import config for privatekey later & generateAuthToken need in user schema
          const user = await User.findById("5ecbf55607088b2b3f573459");
          console.log(user);

          const token = sign(
            {
              id: user?._id,
              firstname: user?.firstname,
              lastname: user?.lastname,
            },
            "helloworld"
          );

          return { req: { headers: { authorization: `Bearer ${token}` } } };
        },
      });

      const { query, mutate } = createTestClient(server);

      const res = await query({ query: GET_USERS });
      expect(res).toMatchSnapshot();
    });

    it("should return single user with provided ID", async () => {
      const res = await query({
        query: GET_USER,
        variables: {
          id: "5ecbf55607088b2b3f573459",
        },
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
        //! Too specific test
        variables: { id: "5ecbf96716adcf33089b9198" },
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
        variables: { id: "5ecbf68781de4e2d392e22c3" },
      });
      expect(res).toMatchSnapshot();
    });
  });
});
