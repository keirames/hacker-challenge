import { model, Schema, Model, Document } from "mongoose";

const challengeSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  level: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy",
  },
});

interface IChallenge extends Document {
  title: string;
  content: string;
  level: string;
}

const Challenge: Model<IChallenge> = model<IChallenge>(
  "Challenge",
  challengeSchema
);

// const challege = new Challenge({ title: "Find max", content: "You have..." });
// challege.save();

// module.exports = { challengeSchema, Challenge };
export { challengeSchema, Challenge };
