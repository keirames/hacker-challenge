import { Challenge, validateChallenge } from "../models/challenge";
import { User } from "../models/user";
import { Contest } from "../models/contest";
import mongoose from "mongoose";
import { slugify } from "../utils/utilities";

const challengeResolvers = {
  Query: {
    getChallenge: async (parent: any, args: any, context: any) => {
      return await Challenge.findOne({ slug: args.slug });
    },
    getChallenges: async (parent: any, args: any, context: any) => {
      return await Challenge.find({});
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
  Mutation: {
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

      // If title exist
      let challenge = await Challenge.findOne({ title });
      if (challenge) throw new Error(`Title is already taken`);

      // Create a unique slug
      const slug = slugify(title);
      const checkSlug = await Challenge.findOne({ slug });
      if (checkSlug) throw new Error(`Title creates an existed slug`);

      const contest = await Contest.findById(contestId);
      if (!contest) throw new Error(`Invalid contest's id`);

      challenge = new Challenge({
        title,
        slug,
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
        _id: {
          $nin: [challengeId],
        },
      });
      if (uniqueTitleChallenge)
        throw new Error(`Challenge's title is already exist`);

      // Create a unique slug
      const slug = slugify(title);
      const checkSlug = await Challenge.findOne({
        slug,
        _id: {
          $nin: [challengeId],
        },
      });
      if (checkSlug) throw new Error(`Title creates an existed slug`);

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
      delete user.account.password;
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
      delete user.account.password;
      return user.likedChallenges;
    },
  },
};

export default challengeResolvers;
