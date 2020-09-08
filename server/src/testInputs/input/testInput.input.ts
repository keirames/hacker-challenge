import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TestInputInput {
  @Field(() => String)
  input: string;
}
