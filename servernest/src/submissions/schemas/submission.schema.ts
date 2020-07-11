import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Submission extends Document {
  @Prop({ required: true })
  answer: string;

  @Prop({ required: true, default: false })
  isPassed: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: 'Challenge',
    required: true,
  })
  challengeId: string;
}

export const submissionSchema = SchemaFactory.createForClass(Submission);
