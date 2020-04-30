import mongoose, { mongo } from "mongoose";
import { Challenge, validateChallenge } from "../models/challenge";
import { User, validateUser } from "../models/user";
import { Contest, validateContest } from "../models/contest";
import { sign } from "jsonwebtoken";
import { authenticateUser } from "../utils/auth";
import { assert } from "chai";
import { writeFile, createWriteStream, write } from "fs";
import { join } from "path";
import { code } from "../code";
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    getChallenge: async (parent: any, args: any, context: any) => {
      return await Challenge.findById(args.id);
    },
    getChallenges: async (parent: any, args: any, context: any) => {
      return await Challenge.find({});
    },
    //! Need admin authorization
    getUser: async (parent: any, args: any, context: any) => {
      return await User.findById(args.id);
    },
    //! Need admin authorization
    getUsers: async (parent: any, args: any, context: any) => {
      const user = await authenticateUser(context);
      return await User.find({});
    },
    getContest: async (parent: any, args: any, context: any) => {
      return await Contest.findById(args.id);
    },
    getContests: async (parent: any, args: any, context: any) => {
      return await Contest.find({});
    },
  },
  User: {
    solvedChallenges: async (
      parent: any,
      args: any,
      context: any,
      info: any
    ) => {
      const getChallenge = async (challengeId: String) => {
        return await Challenge.findById(challengeId);
      };

      const getChallenges = async () => {
        return Promise.all(
          parent.solvedChallenges.map((challengeId: any) =>
            getChallenge(challengeId)
          )
        );
      };

      return await getChallenges();
    },
    likedChallenges: async (
      parent: any,
      args: any,
      context: any,
      info: any
    ) => {
      const getChallenge = async (challengeId: String) => {
        return await Challenge.findById(challengeId);
      };

      const getChallenges = async () => {
        return Promise.all(
          parent.likedChallenges.map((challengeId: any) =>
            getChallenge(challengeId)
          )
        );
      };

      return await getChallenges();
    },
  },
  Challenge: {
    passedUser: async (parent: any, args: any, context: any, info: any) => {
      return await User.find({ solvedChallenges: parent.id }, "-password");
    },
    contest: async (parent: any, args: any, context: any, info: any) => {
      return await Contest.findById(parent.contest);
    },
  },
  Contest: {
    challenges: async (parent: any, args: any, context: any, info: any) => {
      return await Challenge.find({ contest: parent.contest });
    },
  },
  Mutation: {
    login: async (parent: any, args: any, context: any, info: any) => {
      const { username, password } = args;

      const { error } = validateUser({
        username,
        password,
        firstname: "validFirstName",
        lastname: "validLastName",
      });
      if (error) throw new Error(error.details[0].message);

      const user = await User.findOne({ username });
      if (!user) throw new Error(`Invalid username or password`);

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) throw new Error(`Invalid username or password`);

      //! Import config for privatekey later & generateAuthToken need in user schema
      const token: string = sign(
        {
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
        },
        "helloworld"
      );
      return token;
    },
    register: async (parent: any, args: any, context: any, info: any) => {
      const { username, password, firstname, lastname } = args.user;

      const { error } = validateUser(args.user);
      if (error) throw new Error(error.details[0].message);

      // If username already exist
      let user = await User.findOne({ username });
      if (user) throw new Error(`Username already taken`);

      user = new User({
        username,
        password,
        firstname,
        lastname,
      });

      user.password = await bcrypt.hash(user.password, 10);

      //? Do i need include password into token ?
      //! Import config for privatekey later & generateAuthToken need in user schema
      const token: string = sign(
        {
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
        },
        "helloworld"
      );
      user = await user.save();
      delete user.password;

      return { token, user };
    },
    // ? How to create flexible InputUser graphql
    editUser: async (parent: any, args: any, context: any, info: any) => {
      const { userId } = args;
      const { username = "", password = "", firstname, lastname } = args.user;

      const { error } = validateUser(args.user);
      if (error) throw new Error(error.details[0].message);

      if (!mongoose.Types.ObjectId.isValid(userId))
        throw new Error(`Invalid user's id`);

      let user = await User.findById(userId);
      if (!user) throw new Error(`Invalid user's id`);

      user.firstname = firstname;
      user.lastname = lastname;
      user = await user.save();
      delete user.password;

      return user.save();
    },
    addChallenge: async (parent: any, args: any, context: any, info: any) => {
      const {
        title,
        content,
        level,
        points,
        contestId,
        testCases,
        testInputs,
        challengeSeed,
      } = args.challenge;

      const { error } = validateChallenge(args.challenge);
      if (error) throw new Error(error.details[0].message);

      const contest = await Contest.findById(contestId);
      if (!contest) throw new Error(`Invalid contest's id`);

      // If title exist
      let challenge = await Challenge.findOne({ title });
      if (challenge) throw new Error(`Title is already taken`);

      challenge = new Challenge({
        title,
        content,
        level,
        points,
        contest: contestId,
        testCases,
        testInputs,
        challengeSeed,
      });
      challenge = await challenge.save();

      return challenge;
    },
    editChallenge: async (parent: any, args: any, context: any, info: any) => {
      const { challengeId } = args;
      const {
        title,
        content,
        level,
        points,
        contestId,
        testCases,
        testInputs,
        challengeSeed,
      } = args.challenge;

      const { error } = validateChallenge(args.challenge);
      if (error) throw new Error(error.details[0].message);

      if (!mongoose.Types.ObjectId.isValid(challengeId))
        throw new Error(`Invalid challenge's id`);

      let challenge = await Challenge.findById(challengeId);
      if (!challenge) throw new Error(`Invalid challenge's id`);

      const uniqueTitleChallenge = await Challenge.findOne({
        title,
        _id: { $nin: [challengeId] },
      });
      if (uniqueTitleChallenge)
        throw new Error(`Challenge' title is already exist`);

      const contest = await Contest.findById(contestId);
      if (!contest) throw new Error(`Invalid contest's id`);

      challenge.title = title;
      challenge.content = content;
      challenge.level = level;
      challenge.points = points;
      challenge.contest = contestId;
      challenge.testCases = testCases;
      challenge.testInputs = testInputs;
      challenge.challengeSeed = challengeSeed;

      challenge = await challenge.save();
      return challenge;
    },
    // ! Dont need to remove solvedChallenges
    addOrRemoveSolvedChallenges: async (
      parent: any,
      args: any,
      context: any
    ) => {
      const { userId, challengeId } = args;

      if (!mongoose.Types.ObjectId.isValid(challengeId))
        throw new Error(`Invalid challenge's id`);

      if (!mongoose.Types.ObjectId.isValid(userId))
        throw new Error(`Invalid user's id`);

      let user = await User.findById(userId);
      if (!user) throw new Error(`Invalid user's id`);

      let challenge = await Challenge.findById(challengeId);
      if (!challenge) throw new Error(`Invalid challenge's id`);

      const index: number = user.solvedChallenges.indexOf(challengeId);
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
      parent: any,
      args: any,
      context: any
    ) => {
      const { userId, challengeId } = args;

      if (!mongoose.Types.ObjectId.isValid(challengeId))
        throw new Error(`Invalid challenge's id`);

      if (!mongoose.Types.ObjectId.isValid(userId))
        throw new Error(`Invalid user's id`);

      let user = await User.findById(userId);
      if (!user) throw new Error(`Invalid user's id`);

      let challenge = await Challenge.findById(challengeId);
      if (!challenge) throw new Error(`Invalid challenge's id`);

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
    addContest: async (parent: any, args: any, context: any, info: any) => {
      const { name } = args.contest;

      const { error } = validateContest(args.contest);
      if (error) throw new Error(error.details[0].message);

      // Check name unique
      let contest = await Contest.findOne({ name });
      if (contest) throw new Error(`Name of contest is already taken`);

      contest = new Contest({ name });
      return await contest.save();
    },
    editContest: async (parent: any, args: any, context: any, info: any) => {
      const { name } = args.contest;

      const { error } = validateContest(args.contest);
      if (error) throw new Error(error.details[0].message);

      if (!mongoose.Types.ObjectId.isValid(args.contestId))
        throw new Error(`Invalid contest's id`);

      let contest = await Contest.findById(args.contestId);
      if (!contest) throw new Error(`Invalid contest's id`);

      // Check name unique
      let uniqueContest = await Contest.findOne({
        name,
        _id: { $nin: [args.contestId] },
      });
      if (uniqueContest) throw new Error(`Name of contest is already taken`);

      contest.name = name;
      return await contest.save();
    },
    submitAnswer: async (parent: any, args: any, context: any, info: any) => {
      const { challengeId, answer } = args;

      const sum: Function = new Function(answer)();
      const checkAnonymous: Function = new Function(
        "assert",
        "sum",
        "return assert(sum(1,2) === 3)"
      );

      // await writeFile("test.ts", code, () => {});
      const writer = createWriteStream("test.ts", { encoding: "utf8" });
      writer.write(code);
      // if (anonymousFunc()(1, 2) === 3) return [true];

      // console.log(checkAnonymous(assert, sum).toString());
      console.log(sum.toString());
      return [true];
    },
  },
};

export default resolvers;
