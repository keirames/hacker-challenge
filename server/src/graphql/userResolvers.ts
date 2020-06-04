import { User, validateUser } from "../models/user";
import { authenticateUser } from "../utils/auth";
import { Challenge } from "../models/challenge";
import { sign } from "jsonwebtoken";
import mongoose from "mongoose";
import executeSolution from "./utils/executeSolution";
const bcrypt = require("bcrypt");

const userResolvers = {
  Query: {
    //! Need admin authorization
    getUser: async (parent: any, args: any, context: any) => {
      return await User.findById(args.id);
    },
    //! Need admin authorization
    getUsers: async (parent: any, args: any, context: any) => {
      const user = await authenticateUser(context);
      return await User.find({});
    },
    //! Dont have integration test
    getMe: async (parent: any, args: any, context: any) => {
      const user = await authenticateUser(context);
      return user;
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
      //? sign({...user}) => spread all unknown properties
      const token: string = sign(
        {
          id: user._id,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          totalPoints: user.totalPoints,
          isPremium: user.isPremium,
        },
        "helloworld",
        {
          expiresIn: "2d",
        }
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
      user = await user.save();

      //! Create generateToken for user schema (refactor)
      //! Import config for privatekey later & generateAuthToken need in user schema
      const token = sign(
        {
          id: user._id,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          totalPoints: user.totalPoints,
          isPremium: user.isPremium,
        },
        "helloworld",
        { expiresIn: "2d" }
      );

      //* Mongoose return model object and it cannot be delete properties
      //* Change it to plain object .toObject();
      //* But plain object _id need change to id
      //* Better set graphql server cannot get password of user
      // user.password = "you cannot get it";
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
    submitAnswer: async (parent: any, args: any, context: any, info: any) => {
      const { challengeSlug, answer } = args;

      const user = await authenticateUser(context);

      let challenge = await Challenge.findOne({ slug: challengeSlug });
      if (!challenge) throw new Error(`Invalid challenge slug`);

      const testInputs: any[] = challenge.testInputs;
      const testStrings: any[] = [];
      challenge.testCases.forEach((testCase: any) =>
        testStrings.push(testCase.testString)
      );

      const executeResult = await executeSolution(user._id, {
        testInputs,
        testStrings,
        answer,
      });

      if (executeResult.error) return executeResult.error;
      return executeResult;
    },
  },
};

export default userResolvers;
