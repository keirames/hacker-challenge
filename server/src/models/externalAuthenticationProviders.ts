import { model, Schema, Document } from "mongoose";

export interface ExternalAuthenticationProvider extends Document {
  name: string;
}

export const externalAuthenticationProviderSchema = new Schema({
  name: { type: String, maxlength: 20, required: true },
});

externalAuthenticationProviderSchema.index({ name: 1 });

export const ExternalAuthenticationProvider = model<
  ExternalAuthenticationProvider
>("ExternalAuthenticationProvider", externalAuthenticationProviderSchema);
