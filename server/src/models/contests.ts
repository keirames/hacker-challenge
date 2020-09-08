import { model, Schema, Document } from "mongoose";
import Joi from "@hapi/joi";

export interface Contest extends Document {
  name: string;
  slug: string;
}

export const contestSchema = new Schema({
  name: { type: String, unique: true, minlength: 5, required: true },
  slug: { type: String, unique: true, required: true },
});

export const Contest = model<Contest>("Contest", contestSchema);

export const validateContest = (contest: any) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(contest);
};
