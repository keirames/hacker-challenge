import { model, Schema, Document } from "mongoose";
import Joi from "@hapi/joi";
import { UserAccount, userAccountSchema } from "./userAccounts";

export interface User extends Document {
  solvedChallenges: string[];
  likedChallenges: string[];
  totalPoints: number;
  account: UserAccount;
  userExternalLogins: string[];
  subscribes: {
    planId: string;
    startTime: string;
    endTime: string;
  };
}

export const userSchema = new Schema({
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
  account: {
    type: userAccountSchema,
  },
  subscribes: [
    {
      planId: { type: Schema.Types.ObjectId, ref: "Plan" },
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
    },
  ],
});

export const User = model<User>("User", userSchema);

userSchema.index(
  { "account.email": 1 },
  {
    unique: true,
    partialFilterExpression: {
      "account.email": {
        $type: "string",
      },
    },
  },
);

// export const validateUser = (user: any) => {
//   const schema = Joi.object({
//     email: Joi.string().email().min(5).max(255).required(),
//     firstname: Joi.string().max(255),
//     lastname: Joi.string().max(255),
//     password: Joi.string().max(255),
//   });
//   return schema.validate(user);
// };
