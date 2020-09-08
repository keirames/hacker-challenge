import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class MarkLikeChallengeInput {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  challengeId: number;
}
