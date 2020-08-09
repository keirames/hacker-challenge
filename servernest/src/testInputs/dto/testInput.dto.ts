import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TestInputDto {
  @Field(() => String)
  input: string;
}
