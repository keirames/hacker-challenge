import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AssertDto {
  @Field(() => String)
  message: string;
}

@ObjectType()
export class TestedResultDto {
  @Field(() => Boolean)
  passed: boolean;

  @Field(() => AssertDto)
  assert?: { message: string };

  @Field(() => Int)
  time: number;
}
