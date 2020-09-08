import { model, Schema, Document } from "mongoose";

export interface UserExternalLogin extends Document {
  externalAuthenticationProviderId: string;
  externalUserId: number;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
}

export const userExternalLoginSchema = new Schema({
  externalAuthenticationProviderId: {
    type: Schema.Types.ObjectId,
    ref: "ExternalAuthenticationProvider",
    required: true,
  },
  externalUserId: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
    default: "",
  },
  firstName: {
    type: String,
    required: false,
    default: "",
  },
  lastName: {
    type: String,
    required: false,
    default: "",
  },
});

userExternalLoginSchema.index({ email: 1, name: 1 });

export const UserExternalLogin = model<UserExternalLogin>(
  "UserExternalLogin",
  userExternalLoginSchema,
);
