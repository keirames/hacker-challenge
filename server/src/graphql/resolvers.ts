import mongoose, { mongo } from "mongoose";
import { Challenge, validateChallenge } from "../models/challenge";
import { User, validateUser } from "../models/user";
import { Category, validateCategory } from "../models/category";
import { sign } from "jsonwebtoken";
import { authenticateUser } from "../utils/auth";
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    getChallenge: async (parent: any, args: any, context: any) => {
      return await Challenge.findById(args.id);
    },
    getChallenges: async (parent: any, args: any, context: any) => {
      return await Challenge.find({});
    },
    getUser: async (parent: any, args: any, context: any) => {
      return await User.findById(args.id, "-password");
    },
    getUsers: async (parent: any, args: any, context: any) => {
      const user = await authenticateUser(context);
      return User.find({}, "-password");
    },
    getCategory: async (parent: any, args: any, context: any) => {
      return await Category.findById(args.id);
    },
    getCategories: async (parent: any, args: any, context: any) => {
      return await Category.find({});
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
    category: async (parent: any, args: any, context: any, info: any) => {
      return await Category.findById(parent.category);
    },
  },
  Category: {
    challenges: async (parent: any, args: any, context: any, info: any) => {
      return await Challenge.find({ category: parent.category });
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

      let user = new User({
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
      const { title, content, level, categoryId } = args.challenge;

      const { error } = validateChallenge(args.challenge);
      if (error) throw new Error(error.details[0].message);

      const category = await Category.findById(categoryId);
      if (!category) throw new Error(`Invalid category's id`);

      let challenge = new Challenge({
        title,
        content,
        level,
        category: categoryId,
      });
      challenge = await challenge.save();

      return challenge;
    },
    editChallenge: async (parent: any, args: any, context: any, info: any) => {
      const { challengeId } = args;
      const { title, content, level, categoryId } = args.challenge;

      const { error } = validateChallenge(args.challenge);
      if (error) throw new Error(error.details[0].message);

      if (!mongoose.Types.ObjectId.isValid(challengeId))
        throw new Error(`Invalid challenge's id`);

      let challenge = await Challenge.findById(challengeId);
      if (!challenge) throw new Error(`Invalid challenge's id`);

      const category = await Category.findById(categoryId);
      if (!category) throw new Error(`Invalid category's id`);

      challenge.title = title;
      challenge.content = content;
      challenge.level = level;
      challenge.category = categoryId;

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
    addCategory: async (parent: any, args: any, context: any, info: any) => {
      const { name } = args.category;

      const { error } = validateCategory(args.category);
      if (error) throw new Error(error.details[0].message);

      let category = new Category({ name });
      return await category.save();
    },
    editCategory: async (parent: any, args: any, context: any, info: any) => {
      const { name } = args.category;

      const { error } = validateCategory(args.category);
      if (error) throw new Error(error.details[0].message);

      if (!mongoose.Types.ObjectId.isValid(args.categoryId))
        throw new Error(`Invalid category's id`);

      let category = await Category.findById(args.categoryId);
      if (!category) throw new Error(`Invalid category's id`);

      category.name = name;
      return await category.save();
    },
  },
};

export default resolvers;
