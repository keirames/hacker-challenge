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
        category {
          name
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
        category {
          name
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
        category {
          name
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
        category {
          name
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
      category {
        name
      }
      passedUser {
        id
        username
        password
        firstname
        lastname
        likedChallenges {
          id
        }
        solvedChallenges {
          id
        }
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
      category {
        name
      }
      passedUser {
        id
        username
        password
        firstname
        lastname
        likedChallenges {
          id
        }
        solvedChallenges {
          id
        }
      }
    }
  }
`;

const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      name
      challenges {
        id
      }
    }
  }
`;

const GET_CATEGORY = gql`
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      name
      challenges {
        id
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
        variables: { id: "5e9beb8203a9480f22dcb733" },
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
        variables: { id: "5e9bec5203a9480f22dcb737" },
      });
      expect(res).toMatchSnapshot();
    });
  });

  describe("Category", () => {
    it("should return all categories", async () => {
      const res = await query({
        query: GET_CATEGORIES,
        variables: { id: "5e9b2feccf07096f9ef2bc65" },
      });
      expect(res).toMatchSnapshot();
    });

    it("should return single category with provided ID", async () => {
      const res = await query({
        query: GET_CATEGORY,
        variables: { id: "5e9b2ff8cf07096f9ef2bc67" },
      });
      expect(res).toMatchSnapshot();
    });
  });
});