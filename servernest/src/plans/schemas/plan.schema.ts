import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Plan extends Document {
  @Prop({ unique: true, minlength: 2, required: true })
  name: string;

  @Prop({ min: 0, required: true })
  creditsPerMonth: number;

  @Prop({ min: 0, required: true })
  pricePerMonth: number;
}

export const planSchema = SchemaFactory.createForClass(Plan);
