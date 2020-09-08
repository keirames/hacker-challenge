import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TestCaseDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => String)
  testString: string;
}
