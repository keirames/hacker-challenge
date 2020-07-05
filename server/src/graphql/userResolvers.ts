import mongoose from "mongoose";
import { sign } from "jsonwebtoken";
import { User, validateUser } from "../models/users";
import { authenticateUser } from "../utils/auth";
import { Challenge } from "../models/challenges";
import executeSolution from "./utils/executeSolution";

const passport = require("passport");
const bcrypt = require("bcrypt");

const userResolvers = {
  Query: {
    //! Need admin authorization
    getUser: async (parent: any, args: any, context: any) =>
      User.findById(args.id),
    //! Need admin authorization
    getUsers: async (parent: any, args: any, context: any) => {
      const user = await authenticateUser(context);
      return User.find({});
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
      info: any,
    ) => {
      const getChallenge = async (challengeId: String) =>
        Challenge.findById(challengeId);

      const getChallenges = async () =>
        Promise.all(
          parent.solvedChallenges.map((challengeId: any) =>
            getChallenge(challengeId),
          ),
        );

      return getChallenges();
    },
    likedChallenges: async (
      parent: any,
      args: any,
      context: any,
      info: any,
    ) => {
      const getChallenge = async (challengeId: String) =>
        Challenge.findById(challengeId);

      const getChallenges = async () =>
        Promise.all(
          parent.likedChallenges.map((challengeId: any) =>
            getChallenge(challengeId),
          ),
        );

      return getChallenges();
    },
  },
  Mutation: {
    // login: async (parent: any, args: any, context: any, info: any) => {
    //   const { email, password } = args;

    //   const { error } = validateUser({
    //     email,
    //     password,
    //     firstname: "validFirstName",
    //     lastname: "validLastName",
    //   });
    //   if (error) throw new Error(error.details[0].message);

    //   const user = await User.findOne({ email });
    //   if (!user) throw new Error("Invalid email or password");

    //   const isValidPassword = await bcrypt.compare(
    //     password,
    //     user.account.password,
    //   );
    //   if (!isValidPassword) throw new Error("Invalid email or password");

    //   //! Import config for privatekey later & generateAuthToken need in user schema
    //   const token: string = sign(
    //     {
    //       id: user._id,
    //       email: user.email,
    //       firstname: user.firstname,
    //       lastname: user.lastname,
    //       totalPoints: user.totalPoints,
    //       isPremium: user.isPremium,
    //     },
    //     "helloworld",
    //     {
    //       expiresIn: "2d",
    //     },
    //   );
    //   return token;
    // },
    // register: async (parent: any, args: any, context: any, info: any) => {
    //   const { email, password, firstname, lastname } = args.user;

    //   const { error } = validateUser(args.user);
    //   if (error) throw new Error(error.details[0].message);

    //   // If email already exist
    //   let user = await User.findOne({ email });
    //   if (user) throw new Error("email already taken");

    //   user = new User({
    //     email,
    //     password,
    //     firstname,
    //     lastname,
    //   });

    //   user.account.password = await bcrypt.hash(user.account.password, 10);
    //   user = await user.save();

    //   //! Create generateToken for user schema (refactor)
    //   //! Import config for privatekey later & generateAuthToken need in user schema
    //   const token = sign(
    //     {
    //       id: user._id,
    //       email: user.email,
    //       firstname: user.firstname,
    //       lastname: user.lastname,
    //       totalPoints: user.totalPoints,
    //       isPremium: user.isPremium,
    //     },
    //     "helloworld",
    //     { expiresIn: "2d" },
    //   );

    //   //* Mongoose return model object and it cannot be delete properties
    //   //* Change it to plain object .toObject();
    //   //* But plain object _id need change to id
    //   //* Better set graphql server cannot get password of user
    //   // user.password = "you cannot get it";
    //   return { token, user };
    // },
    // TODO How to create flexible InputUser graphql
    // editUser: async (parent: any, args: any, context: any, info: any) => {
    //   const { userId } = args;
    //   const { email = "", password = "", firstname, lastname } = args.user;

    //   const { error } = validateUser(args.user);
    //   if (error) throw new Error(error.details[0].message);

    //   if (!mongoose.Types.ObjectId.isValid(userId)) {
    //     throw new Error("Invalid user's id");
    //   }

    //   let user = await User.findById(userId);
    //   if (!user) throw new Error("Invalid user's id");

    //   user.firstname = firstname;
    //   user.lastname = lastname;
    //   user = await user.save();
    //   delete user.account.password;

    //   return user.save();
    // },
    submitAnswer: async (parent: any, args: any, context: any, info: any) => {
      const { challengeSlug, answer } = args;

      const user = await authenticateUser(context);

      const challenge = await Challenge.findOne({ slug: challengeSlug });
      if (!challenge) throw new Error("Invalid challenge slug");

      const { testInputs } = challenge;
      const testStrings: any[] = [];
      challenge.testCases.forEach((testCase: any) =>
        testStrings.push(testCase.testString),
      );

      const executeResult = await executeSolution(user._id, {
        testInputs,
        testStrings,
        answer,
      });

      // If you successfully solve challenge
      if (!user.solvedChallenges.includes(challenge.id)) {
        const isPassedChallenge =
          executeResult.testedResults?.filter((t) => t.passed).length ===
          challenge.testCases.length;

        if (isPassedChallenge) {
          user.solvedChallenges.push(challenge.id);
          user.totalPoints += challenge.points;
          await user.save();
        }
      }

      if (executeResult.error) return executeResult.error;
      return executeResult;
    },
  },
};

// const authenticationWithGithub = async (
//   client_id: string,
//   code: string,
//   redirect_uri: string,
// ) => {
//   const body = new FormData();
//   body.append("client_id", client_id);
//   body.append("client_secret", "46d128febde2ef7001671ee344761fda3e213f52");
//   body.append("code", code);
//   body.append("redirect_uri", redirect_uri);

//   try {
//     let googleId: number;

//     let response = await fetch(`https://github.com/login/oauth/access_token`, {
//       method: "POST",
//       body,
//     });

//     let params = new URLSearchParams(await response.text());
//     const access_token = params.get("access_token");
//     const scope = params.get("scope");
//     const token_type = params.get("token_type");

//     // Get googleId
//     response = await fetch(
//       `https://api.github.com/user?access_token=${access_token}&scope=${scope}&token_type=${token_type}`,
//     );
//     const googleInfo = await response.json();
//     if (typeof googleInfo.id !== "number")
//       throw new Error("Cannot get google id");
//     googleId = googleInfo.id;

//     // Request to return data of a user that has been authenticated
//     response = await fetch(
//       `https://api.github.com/user/emails?access_token=${access_token}&scope=${scope}&token_type=${token_type}`,
//     );

//     let data: any[] = await response.json();
//     for (let userIdentity of data) {
//       if (userIdentity.primary) {
//         if (typeof userIdentity.email !== "string")
//           throw new Error(`Cannot get user'email`);

//         const email: string = userIdentity.email;
//         return { googleId, email };
//       }
//     }
//     throw new Error(`Cannot get user'email`);
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

export default userResolvers;
