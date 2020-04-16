const graphql = require("graphql");
import { Challenge } from "../models/challenge";
import { User } from "../models/user";

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = graphql;

const ChallengeType = new GraphQLObjectType({
  name: "Challenge",
  fields: () => ({
    id: { type: GraphQLID },
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    level: {
      type: GraphQLString,
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    // solvedChallenges: {
    //   type: new GraphQLList(ChallengeType),
    //   resolve(parent: any, args: any) {
    //     return Challenge.findById(args.id);
    //   },
    // },
    solvedChallenges: {
      type: new GraphQLList(GraphQLID),
    },
    likedChallenges: { type: new GraphQLList(GraphQLID) },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    challenge: {
      type: ChallengeType,
      args: { id: { type: GraphQLID } },
      resolve(parent: any, args: any) {
        return Challenge.findById(args.id);
      },
    },
    challenges: {
      type: new GraphQLList(ChallengeType),
      resolve(parent: any, args: any) {
        return Challenge.find({});
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent: any, args: any) {
        return User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent: any, args: any) {
        return User.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
      },
      resolve(parent: any, args: any) {
        const { username, password, firstname, lastname } = args;
        const user = new User({
          username,
          password,
          firstname,
          lastname,
        });
        return user.save();
      },
    },
    addOrRemoveSolvedChallenge: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        challengeId: { type: GraphQLID },
      },
      resolve(parent: any, args: any) {
        const { userId, challengeId } = args;

        let user = User.findById(userId, (err: any, user) => {
          if (!user) throw new Error("No user found");

          const index: number = user.solvedChallenges.indexOf(
            challengeId
          );
          if (index === -1) {
            user.solvedChallenges.push(challengeId);
          } else {
            user.solvedChallenges.splice(index, 1);
          }
          user.save();
        });

        return user;
      },
    },
    addChallenge: {
      type: ChallengeType,
      args: {
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        level: { type: GraphQLString },
      },
      resolve(parent: any, args: any) {
        const { title, content, level } = args;
        const challenge = new Challenge({ title, content, level });
        return challenge.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutation,
});
