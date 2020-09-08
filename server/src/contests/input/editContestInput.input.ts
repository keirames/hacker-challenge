import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class EditContestInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}
