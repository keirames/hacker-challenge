// import { model, Schema, Model, Document } from "mongoose";
// import Joi from "@hapi/joi";

// export interface User extends Document {
//   email: string;
//   password: string;
//   firstname: string;
//   lastname: string;
//   isPremium: boolean;
//   solvedChallenges: string[];
//   likedChallenges: string[];
//   totalPoints: number;
// }

// export const userSchema: Schema = new Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     minlength: 5,
//   },
//   password: { type: String, required: true, minlength: 5 },
//   firstname: { type: String, required: true, default: "" },
//   lastname: { type: String, required: true, default: "" },
//   isPremium: { type: Boolean, required: true, default: false },
//   solvedChallenges: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Challenge",
//     },
//   ],
//   likedChallenges: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Challenge",
//     },
//   ],
//   totalPoints: {
//     type: Number,
//     required: true,
//     default: 0,
//     min: 0,
//   },
// });

// export const User: Model<User> = model<User>("User", userSchema);

// export const validateUser = (user: any) => {
//   const schema = Joi.object({
//     email: Joi.string().email().min(5).max(255).required(),
//     password: Joi.string().min(5).max(255).required(),
//     firstname: Joi.string().max(255),
//     lastname: Joi.string().max(255),
//   });
//   return schema.validate(user);
// };

import { model, Schema, Model, Document } from "mongoose";
import Joi from "@hapi/joi";

export interface User extends Document {
  email: string;
  firstname: string;
  lastname: string;
  isPremium: boolean;
  solvedChallenges: string[];
  likedChallenges: string[];
  totalPoints: number;
  googleId: number;
  facebookId: number;
  githubId: number;
  account: {
    password: string;
    registrationTime: string;
    emailConfirmationToken: string;
    userAccountStatusId: string;
    passwordReminderToken: string;
    passwordReminderExpire: string;
  };
}

export const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: false,
    minlength: 5,
  },
  firstname: { type: String, required: true, default: "" },
  lastname: { type: String, required: true, default: "" },
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
  googleId: { type: Number },
  facebookId: { type: Number },
  githubId: { type: Number },
  account: {
    password: {
      type: String,
      required: function () {
        return !(this.googleId || this.githubId);
      },
    },
    registrationTime: {
      type: Date,
      required: function () {
        return !(this.googleId || this.githubId);
      },
    },
    emailConfirmationToken: {
      type: String,
    },
    userAccountStatusId: {
      type: String,
    },
    passwordReminderToken: {
      type: String,
    },
    passwordReminderExpire: {
      type: Date,
    },
  },
});

export const User: Model<User> = model<User>("User", userSchema);

// Cannot specify it in a mongoose schema or TS not recognize it
User.collection.createIndex(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: {
      email: {
        $type: "string",
      },
    },
  }
);

export const validateUser = (user: any) => {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(255).required(),
    firstname: Joi.string().max(255),
    lastname: Joi.string().max(255),
    password: Joi.string().max(255),
  });
  return schema.validate(user);
};
