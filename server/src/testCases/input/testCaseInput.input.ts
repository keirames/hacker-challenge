import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TestCaseInput {
  @Field(() => String)
  text: string;

  @Field(() => String)
  testString: string;
}
