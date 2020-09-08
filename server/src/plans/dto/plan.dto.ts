import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class PlanDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Float)
  pricePerMonth: number;
}
