import { model, Schema, Model, Document } from "mongoose";

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
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
});

interface IUser extends Document {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  solvedChallenges: string[];
  likedChallenges: string[];
}

const User: Model<IUser> = model<IUser>("User", userSchema);

// const user = new User({
//   username: "harrypotter",
//   password: "1234",
//   firstname: "Harry",
//   lastname: "Potter",
//   solvedChallenges: [],
//   likedChallenges: [],
// });

// user.save();

export { User, userSchema };
