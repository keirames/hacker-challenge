import { model, Schema, Model, Document } from "mongoose";
import Joi from "@hapi/joi";

export interface Content extends Document {
  problem: string;
  inputSample: string;
  outputSample: string;
}

export interface TestCase extends Document {
  text: string;
  testString: string;
}

export interface Challenge extends Document {
  title: string;
  slug: string;
  contestId: string;
  content: Content;
  level: string;
  points: number;
  testCases: TestCase[];
  testInputs: string[];
  challengeSeed: string;
  // passedUsers: ""
}

export const challengeSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  contestId: {
    type: Schema.Types.ObjectId,
    ref: "Contest",
  },
  content: {
    problem: {
      type: String,
      default: "",
      required: true,
      trim: true,
    },
    inputSample: {
      type: String,
      default: "",
      required: true,
      trim: true,
    },
    outputSample: {
      type: String,
      default: "",
      required: true,
      trim: true,
    },
  },
  level: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy",
    trim: true,
    set: (v: string) => v.toLowerCase(),
    get: (v: string) => v.toLowerCase(),
  },
  points: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  testCases: [
    {
      text: {
        type: String,
        default: "",
        required: true,
        trim: true,
      },
      testString: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
  testInputs: {
    type: [String],
    required: true,
  },
  challengeSeed: {
    type: String,
    required: true,
    default: "",
    trim: true,
  },
});

// Is this compound ?
challengeSchema.index({ title: 1, slug: 1 });

export const Challenge = model<Challenge>("Challenge", challengeSchema);

// export const validateChallenge = (challenge: any) => {
//   const schema = Joi.object({
//     title: Joi.string().min(5).max(255).required(),
//     content: Joi.object({
//       problem: Joi.string(),
//       inputSample: Joi.string(),
//       outputSample: Joi.string(),
//     }),
//     level: Joi.string().required(),
//     points: Joi.number().min(0),
//     contestId: Joi.string().required(),
//     testCases: Joi.array()
//       .required()
//       .items(
//         Joi.object({
//           text: Joi.string().required(),
//           testString: Joi.string().required(),
//         }),
//       ),
//     testInputs: Joi.array().required(),
//     challengeSeed: Joi.string(),
//   });
//   return schema.validate(challenge);
// };
