import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from '../challenges/challenge.entity';
import { ChallengesService } from '../challenges/challenges.service';
import { configService } from '../config/config.service';
import { Contest } from '../contests/contest.entity';
import { Subscription } from '../subscriptions/subscription.entity';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { UserAccount } from '../userAccounts/userAccount.entity';
import { UserAccountsService } from '../userAccounts/userAccounts.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { Submission } from './submission.entity';
import { SubmissionsResolver } from './submissions.resolver';
import { SubmissionsService } from './submissions.service';

describe('SubmissionsResolver', () => {
  let app: INestApplication;
  let resolver: SubmissionsResolver;
  // let submissionsService: SubmissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmTestConfig()),
        TypeOrmModule.forFeature([
          Submission,
          Challenge,
          Contest,
          User,
          UserAccount,
          Subscription,
        ]),
      ],
      providers: [
        SubmissionsResolver,
        SubmissionsService,
        ChallengesService,
        UsersService,
        UserAccountsService,
        SubscriptionsService,
      ],
    }).compile();

    resolver = module.get<SubmissionsResolver>(SubmissionsResolver);
    // submissionsService = module.get<SubmissionsService>(SubmissionsService);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  afterEach(async () => await app.close());
});
