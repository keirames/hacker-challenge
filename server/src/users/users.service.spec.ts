import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from '../challenges/challenge.entity';
import { ChallengesService } from '../challenges/challenges.service';
import { configService } from '../config/config.service';
import { Contest } from '../contests/contest.entity';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { UserAccount } from '../userAccounts/userAccount.entity';
import { UserAccountsModule } from '../userAccounts/userAccounts.module';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let app: INestApplication;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmTestConfig()),
        TypeOrmModule.forFeature([User, UserAccount, Challenge, Contest]),
        UserAccountsModule,
        SubscriptionsModule,
      ],
      providers: [UsersService, ChallengesService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  afterEach(async () => await app.close());
});
