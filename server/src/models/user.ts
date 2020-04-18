import { model, Schema, Model, Document } from "mongoose";

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  password: { type: String, required: true, minlength: 5 },
  firstname: { type: String, required: true, minlength: 2 },
  lastname: { type: String, required: true, minlength: 2 },
  isPremium: { type: Boolean, required: true, default: false },
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
  username: String;
  password: String;
  firstname: String;
  lastname: String;
  isPremium: Boolean;
  solvedChallenges: String[];
  likedChallenges: String[];
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
