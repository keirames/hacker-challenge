import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config/config.service';
import { PlansModule } from '../plans/plans.module';
import { Subscription } from './subscription.entity';
import { SubscriptionsResolver } from './subscriptions.resolver';

describe('SubscriptionsResolver', () => {
  let resolver: SubscriptionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmTestConfig()),
        TypeOrmModule.forFeature([Subscription]),
        PlansModule,
      ],
      providers: [SubscriptionsResolver],
    }).compile();

    resolver = module.get<SubscriptionsResolver>(SubscriptionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
