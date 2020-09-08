import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './subscription.entity';
import { PlansModule } from '../plans/plans.module';
import { SubscriptionsResolver } from './subscriptions.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription]), PlansModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, SubscriptionsResolver],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
