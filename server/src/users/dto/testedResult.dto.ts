import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TestResultDto {
  @Field(() => String)
  text: string;

  @Field(() => String)
  testString: string;

  @Field(() => Boolean)
  pass: boolean;

  @Field(() => String)
  err: string;

  @Field(() => String)
  message: string;

  @Field(() => String)
  stack: string;

  @Field(() => String, { nullable: true })
  log?: string;
}
