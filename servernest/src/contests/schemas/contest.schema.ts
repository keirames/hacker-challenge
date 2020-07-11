import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Contest extends Document {
  @Prop({
    unique: true,
    minlength: 2,
    trim: true,
    lowercase: true,
    index: true,
  })
  name: string;

  @Prop({ unique: true })
  slug: string;
}

export const contestSchema = SchemaFactory.createForClass(Contest);
