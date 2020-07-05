import { model, Schema, Document } from "mongoose";
import Joi from "@hapi/joi";

export interface UserAccount extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  registrationTime: string;
  emailConfirmationToken: string;
  userAccountStatusId: string;
  passwordReminderToken: string;
  passwordReminderExpired: string;
}

export const userAccountSchema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
  },
  firstname: { type: String, required: true, default: "" },
  lastname: { type: String, required: true, default: "" },
  password: { type: String, required: true, minlength: 5, maxlength: 100 },
  registrationTime: { type: Date, required: true, default: Date.now() },
  emailConfirmationToken: { type: String, required: true, maxlength: 100 },
  userAccountStatusId: { type: String, required: true },
  passwordReminderToken: { type: String, maxlength: 100 },
  passwordReminderExpired: { type: Date },
});

export const UserAccount = model<UserAccount>("User", userAccountSchema);

// export const validateUser = (user: any) => {
//   const schema = Joi.object({
//     email: Joi.string().email().min(5).max(255).required(),
//     firstname: Joi.string().max(255),
//     lastname: Joi.string().max(255),
//     password: Joi.string().max(255),
//   });
//   return schema.validate(user);
// };
