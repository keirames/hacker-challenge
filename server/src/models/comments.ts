import { model, Document, Schema } from "mongoose";

export interface Comment extends Document {
  challengeId: string;
  userId: string;
  parentId: string;
  like: number;
  content: string;
  createdAt: string;
}

export const commentSchema = new Schema({
  challengeId: {
    type: Schema.Types.ObjectId,
    ref: "Challenge",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  like: {
    type: Number,
    min: 0,
    required: true,
    default: 0,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

export const Comment = model<Comment>("Comment", commentSchema);
