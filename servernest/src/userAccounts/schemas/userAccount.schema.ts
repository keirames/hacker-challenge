import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'userAccounts' })
export class UserAccount extends Document {
  @Prop({ required: true, unique: true, minlength: 2 })
  email: string;

  @Prop({ required: true, default: '' })
  firstName: string;

  @Prop({ required: true, default: '' })
  lastName: string;

  @Prop({ required: true, minlength: 5 })
  password: string;

  @Prop({ type: Date, required: true, default: Date.now() })
  registrationTime: Date;

  @Prop()
  emailConfirmationToken: string;

  @Prop()
  passwordReminderToken: string;

  @Prop({ type: Date })
  passwordReminderExpire: Date;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: '?', required: true })
  // userAccountStatusId: string;
}

export const userAccountSchema = SchemaFactory.createForClass(UserAccount);

// export const userAccountSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     minlength: 5,
//   },
//   firstName: {
//     type: String,
//     required: true,
//     default: '',
//   },
//   lastName: {
//     type: String,
//     required: true,
//     default: '',
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 5,
//   },
//   registrationTime: {
//     type: Date,
//     required: true,
//     default: Date.now(),
//   },
//   emailConfirmationToken: {
//     type: String,
//   },
//   //   userAccountStatusId: {
//   //       type:
//   //   },
//   passwordReminderToken: {
//     type: String,
//   },
//   passwordReminderExpire: {
//     type: Date,
//   },
// });
