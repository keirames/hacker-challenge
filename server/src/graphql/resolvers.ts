import { Challenge } from "../models/challenge";
import { User } from "../models/user";

const resolvers = {
  Query: {
    getChallenge: (root: any, args: any, context: any) => {
      return Challenge.findById(args.id);
    },
    getChallenges: (root: any, args: any, context: any) => {
      return Challenge.find({});
    },
    getUser: (root: any, args: any, context: any) => {
      return User.findById(args.id, "-password");
    },
    getUsers: (root: any, args: any, context: any) => {
      return User.find({}, "-password");
    },
  },
  User: {
    solvedChallenges: async (
      obj: any,
      args: any,
      context: any,
      info: any
    ) => {
      const getChallenge = async (challengeId: String) => {
        return await Challenge.findById(challengeId);
      };

      const getChallenges = async () => {
        return Promise.all(
          obj.solvedChallenges.map((challengeId: any) =>
            getChallenge(challengeId)
          )
        );
      };

      return await getChallenges();
    },
    likedChallenges: async (
      obj: any,
      args: any,
      context: any,
      info: any
    ) => {
      const getChallenge = async (challengeId: String) => {
        return await Challenge.findById(challengeId);
      };

      const getChallenges = async () => {
        return Promise.all(
          obj.likedChallenges.map((challengeId: any) =>
            getChallenge(challengeId)
          )
        );
      };

      return await getChallenges();
    },
  },
  Challenge: {
    passedUser: async (
      obj: any,
      args: any,
      context: any,
      info: any
    ) => {
      return await User.find(
        { solvedChallenges: obj.id },
        "-password"
      );
    },
  },
  Mutation: {
    addUser: async (obj: any, args: any, context: any, info: any) => {
      const { username, password, firstname, lastname } = args.user;

      let user = new User({
        username,
        password,
        firstname,
        lastname,
      });
      user = await user.save();
      delete user.password;

      return user.save();
    },
    addOrRemoveSolvedChallenges: async (
      root: any,
      args: any,
      context: any
    ) => {
      const { userId, challengeId } = args;
      let user = await User.findById(userId);
      if (!user) throw new Error("No user found");

      const index: number = user.solvedChallenges.indexOf(
        challengeId
      );
      if (index === -1) {
        user.solvedChallenges.push(challengeId);
      } else {
        user.solvedChallenges.splice(index, 1);
      }
      user = await user.save();
      delete user.password;
      return user.solvedChallenges;
    },
    addOrRemoveLikedChallenges: async (
      root: any,
      args: any,
      context: any
    ) => {
      const { userId, challengeId } = args;
      let user = await User.findById(userId);
      if (!user) throw new Error("No user found");

      const index: number = user.likedChallenges.indexOf(challengeId);
      if (index === -1) {
        user.likedChallenges.push(challengeId);
      } else {
        user.likedChallenges.splice(index, 1);
      }
      user = await user.save();
      delete user.password;
      return user.likedChallenges;
    },
  },
};

export default resolvers;
