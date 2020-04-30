import { model, Schema, Model, Document } from "mongoose";
import Joi from "@hapi/joi";

const contestSchema: Schema = new Schema({
  name: { type: String, unique: true, minlength: 5, required: true },
});

interface IContest extends Document {
  name: String;
}

const Contest: Model<IContest> = model<IContest>("Contest", contestSchema);

const validateContest = (contest: any) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(contest);
};

export { contestSchema, Contest, validateContest };
