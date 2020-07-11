// import { Schema } from 'mongoose';

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'externalAuthenticationProviders' })
export class ExternalAuthenticationProvider extends Document {
  @Prop({
    unique: true,
    minlength: 2,
    lowercase: true,
    trim: true,
    index: true,
  })
  name: string;
}

export const externalAuthenticationProviderSchema = SchemaFactory.createForClass(
  ExternalAuthenticationProvider,
);
