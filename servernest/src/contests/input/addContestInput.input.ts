import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddContestInput {
  @Field(() => String)
  name: string;
}
