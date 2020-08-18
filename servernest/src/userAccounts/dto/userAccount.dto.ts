import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserAccountDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  registrationTime: Date;

  @Field(() => String, { nullable: true })
  emailConfirmationToken: string;

  @Field(() => String, { nullable: true })
  passwordReminderToken: string;

  @Field(() => String, { nullable: true })
  passwordReminderExpire: string;
}
