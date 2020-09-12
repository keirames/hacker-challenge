import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getRepository } from 'typeorm';
import { configService } from '../config/config.service';
import { Plan } from '../plans/plan.entity';
import { UserAccount } from '../userAccounts/userAccount.entity';
import { User } from '../users/user.entity';
import { Subscription } from './subscription.entity';
import { SubscriptionsService } from './subscriptions.service';

describe('SubscriptionsService', () => {
  let app: INestApplication;
  let subscriptionsService: SubscriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmTestConfig()),
        TypeOrmModule.forFeature([Subscription]),
        // PlansModule,
      ],
      providers: [SubscriptionsService],
    }).compile();

    subscriptionsService = module.get<SubscriptionsService>(
      SubscriptionsService,
    );

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(subscriptionsService).toBeDefined();
  });

  describe('isInSubscriptionTime', () => {
    it('should return false', async () => {
      let plan = new Plan({ name: 'unique', pricePerMonth: 0 });
      plan = await getRepository(Plan).save(plan);

      let user = new User({
        totalPoints: 0,
        isActivated: true,
        userAccount: new UserAccount({ email: 'unique', password: '1234' }),
      });
      user = await getRepository(User).save(user);

      const subscriptions = new Subscription({
        startTime: new Date(),
        endTime: new Date(),
        plan,
        user,
      });
      await getRepository(Subscription).save(subscriptions);

      const result = await subscriptionsService.isInSubscriptionTime(user.id);

      expect(result).toBeFalsy();
    });

    it('should return true', async () => {
      let plan = new Plan({ name: 'unique', pricePerMonth: 0 });
      plan = await getRepository(Plan).save(plan);

      let user = new User({
        totalPoints: 0,
        isActivated: true,
        userAccount: new UserAccount({ email: 'unique', password: '1234' }),
      });
      user = await getRepository(User).save(user);

      const subscriptions = new Subscription({
        startTime: new Date(),
        endTime: new Date(Date.now() + 1000 * 60 * 60),
        plan,
        user,
      });
      await getRepository(Subscription).save(subscriptions);

      const result = await subscriptionsService.isInSubscriptionTime(user.id);

      expect(result).toBeTruthy();
    });
  });

  afterEach(async () => await app.close());
});
