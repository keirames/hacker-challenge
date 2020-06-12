import { model, Schema, Model, Document } from "mongoose";
import Joi from "@hapi/joi";

export interface User extends Document {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  isPremium: boolean;
  solvedChallenges: string[];
  likedChallenges: string[];
  totalPoints: number;
}

export const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  password: { type: String, required: true, minlength: 5 },
  firstname: { type: String, required: true, minlength: 2 },
  lastname: { type: String, required: true, minlength: 2 },
  isPremium: { type: Boolean, required: true, default: false },
  solvedChallenges: [
    {
      type: Schema.Types.ObjectId,
      ref: "Challenge",
    },
  ],
  likedChallenges: [
    {
      type: Schema.Types.ObjectId,
      ref: "Challenge",
    },
  ],
  totalPoints: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
});

export const User: Model<User> = model<User>("User", userSchema);

export const validateUser = (user: any) => {
  const schema = Joi.object({
    username: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    firstname: Joi.string().min(2).max(255).required(),
    lastname: Joi.string().min(2).max(255).required(),
  });
  return schema.validate(user);
};
