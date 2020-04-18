import { model, Schema, Model, Document } from "mongoose";

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
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

interface IChallenge extends Document {
  title: String;
  content: String;
  level: String;
  points: Number;
  category: String;
}

const Challenge: Model<IChallenge> = model<IChallenge>(
  "Challenge",
  challengeSchema
);

// const challege = new Challenge({ title: "Find max", content: "You have..." });
// challege.save();

// module.exports = { challengeSchema, Challenge };
export { challengeSchema, Challenge };
