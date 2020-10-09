import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class SubmitAnswerInput {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  challengeId: number;

  @Field(() => String)
  answer: string;

  @Field(() => Boolean)
  onlyRunCode: boolean;
}
