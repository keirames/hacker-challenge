import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PlanDto } from '../../plans/dto/plan.dto';
import { Plan } from '../../plans/plan.entity';

@ObjectType()
export class SubscriptionDto {
  @Field(() => Int)
  id: number;

  @Field(() => PlanDto)
  plan: Plan;

  @Field(() => String)
  startTime: Date;

  @Field(() => String)
  endTime: Date;
}
