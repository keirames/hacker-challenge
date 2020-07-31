import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SubmissionDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  answer: string;

  @Field(() => Boolean)
  isPassed: boolean;

  @Field(() => String)
  createdAt: Date;
}
