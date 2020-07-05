import mongoose from "mongoose";
import { Contest, validateContest } from "../models/contests";
import { Challenge } from "../models/challenges";
import { slugify } from "../utils/utilities";

const contestResolvers = {
  Query: {
    getContest: async (parent: any, args: any, context: any) => {
      return await Contest.findOne({ slug: args.slug });
    },
    getContests: async (parent: any, args: any, context: any) => {
      return await Contest.find({});
    },
  },
  Contest: {
    challenges: async (parent: any, args: any, context: any, info: any) => {
      return await Challenge.find({ contest: parent._id });
    },
  },
  Mutation: {
    addContest: async (parent: any, args: any, context: any, info: any) => {
      const { name } = args.contest;

      const { error } = validateContest(args.contest);
      if (error) throw new Error(error.details[0].message);

      // Check name unique
      let contest = await Contest.findOne({
        name,
      });
      if (contest) throw new Error(`Name of contest is already taken`);

      // Create a unique slug
      const slug = slugify(name);
      const checkSlug = await Contest.findOne({
        slug,
      });
      if (checkSlug) throw new Error(`Contest's name creates an existed slug`);

      contest = new Contest({
        name,
        slug,
      });
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
        _id: {
          $nin: [args.contestId],
        },
      });
      if (uniqueContest) throw new Error(`Name of contest is already taken`);

      // Create a unique slug
      const slug = slugify(name);
      const checkSlug = await Contest.findOne({
        slug,
        _id: {
          $nin: [args.contestId],
        },
      });
      if (checkSlug) throw new Error(`Contest's name creates an existed slug`);

      contest.name = name;
      contest.slug = slug;
      return await contest.save();
    },
  },
};

export default contestResolvers;
