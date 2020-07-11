import { Document, Types } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'userExternalLogin' })
export class UserExternalLogin extends Document {
  @Prop()
  externalUserId: number;

  @Prop()
  email: string;

  @Prop({ index: true })
  name: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'ExternalAuthenticationProvider',
  })
  externalAuthenticationProviderId: string;
}

export const userExternalLoginSchema = SchemaFactory.createForClass(
  UserExternalLogin,
);
