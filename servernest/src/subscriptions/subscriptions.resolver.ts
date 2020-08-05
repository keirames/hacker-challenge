import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { PlansService } from '../plans/plans.service';
import { PlanDto } from '../plans/dto/plan.dto';
import { Subscription } from './subscription.entity';
import { Plan } from '../plans/plan.entity';
import { SubscriptionDto } from './dto/subscription.dto';

@Resolver(() => SubscriptionDto)
export class SubscriptionsResolver {
  constructor(private readonly plansService: PlansService) {}

  @ResolveField('plan', () => PlanDto)
  getPlan(@Parent() subscription: Subscription): Promise<Plan | undefined> {
    return this.plansService.findById(subscription.planId);
  }
}
