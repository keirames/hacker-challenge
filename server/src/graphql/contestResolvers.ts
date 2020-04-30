import { Contest, validateContest } from "../models/contest";
import { Challenge } from "../models/challenge";
import mongoose from "mongoose";
import { createWriteStream } from "fs";
import { code } from "../code";

const contestResolvers = {
  Query: {
    getContest: async (parent: any, args: any, context: any) => {
      return await Contest.findById(args.id);
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

export default contestResolvers;
