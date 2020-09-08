import { model, Schema, Document } from "mongoose";

export interface Plan extends Document {
  name: string;
  creditsPerMonth: number;
  pricePerMonth: number;
}

export const planSchema = new Schema({
  name: { type: String, unique: true, required: true, maxlength: 20 },
  creditsPerMonth: { type: Number, required: true, min: 0 },
  pricePerMonth: { type: Number, required: true, min: 0 },
});

planSchema.index({ name: 1 });

export const Plan = model<Plan>("Plan", planSchema);
