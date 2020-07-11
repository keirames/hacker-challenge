import { Schema, Prop, raw, SchemaFactory } from '@nestjs/mongoose';
import {
  userAccountSchema,
  UserAccount,
} from '../../userAccounts/schemas/userAccount.schema';
import { Types, Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: userAccountSchema })
  account: UserAccount;

  @Prop({ type: Number, required: true, min: 0, default: 0 })
  totalPoints: number;

  @Prop({ type: [Types.ObjectId], ref: 'Challenge' })
  solvedChallenges: string[];

  @Prop({ type: [Types.ObjectId], ref: 'Challenge' })
  likedChallenges: string[];

  @Prop({ type: [Types.ObjectId], ref: 'UserExternalLogin' })
  userExternalLogins: string[];

  @Prop(
    raw([
      {
        planId: { type: Types.ObjectId, ref: 'Plan' },
        startTime: { type: Date, required: true, default: Date.now() },
        endTime: {
          type: Date,
          required: true,
          validate: function(v: Date): boolean {
            return this.startTime < v;
          },
          message: (): string => 'Start time must lower than end time',
        },
      },
    ]),
  )
  subscribes: Record<string, string[]>;
}

export const userSchema = SchemaFactory.createForClass(User);
