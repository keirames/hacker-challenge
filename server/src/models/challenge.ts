import { model, Schema, Model, Document } from "mongoose";
import Joi from "@hapi/joi";

const challengeSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
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
  contest: {
    type: Schema.Types.ObjectId,
    ref: "Contest",
  },
});

interface IChallenge extends Document {
  title: String;
  content: String;
  level: String;
  points: Number;
  contest: String;
}

const Challenge: Model<IChallenge> = model<IChallenge>(
  "Challenge",
  challengeSchema
);

const validateChallenge = (challenge: any) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    content: Joi.string().min(5).required(),
    level: Joi.string().required(),
    contest: Joi.string().required(),
  });
  return schema.validate(challenge);
};

export { challengeSchema, Challenge, validateChallenge };
