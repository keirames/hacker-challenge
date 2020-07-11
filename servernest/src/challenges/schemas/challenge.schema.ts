import { Schema, Prop, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum Level {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export interface Content {
  problem: string;
  imputFormat: string;
  outputFormat: string;
}

export interface TestCase {
  text: string;
  testString: string;
}

@Schema()
export class Challenge extends Document {
  @Prop({ required: true, unique: true, minlength: 2, index: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: true,
  })
  level: Level;

  @Prop({ required: true, min: 0, default: 0 })
  points: number;

  @Prop({ required: true, default: '' })
  challengeSeed: string;

  @Prop(
    raw({
      problem: { type: String, required: true },
      inputFormat: { type: String, required: true },
      outputFormat: { type: String, required: true },
    }),
  )
  content: Record<string, Content>;

  @Prop({ type: [String], required: true })
  testInputs: string[];

  @Prop(
    raw([
      {
        text: { type: String, required: true },
        testString: { type: String, required: true },
      },
    ]),
  )
  testCases: Record<string, TestCase[]>;

  // @Prop()
  // passedUser:
}
