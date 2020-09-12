import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from '../challenges/challenge.entity';
import { ChallengesService } from '../challenges/challenges.service';
import { configService } from '../config/config.service';
import { Contest } from '../contests/contest.entity';
import { ExternalAuthenticationProvidersRepository } from '../externalAuthenticationProviders/externalAuthenticationProviders.repository';
import { ExternalAuthenticationProvidersService } from '../externalAuthenticationProviders/externalAuthenticationProviders.service';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
import { Subscription } from '../subscriptions/subscription.entity';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { TestCase } from '../testCases/testCase.entity';
import { UserAccount } from '../userAccounts/userAccount.entity';
import { UserAccountsService } from '../userAccounts/userAccounts.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';

describe('Auth Controller', () => {
  let app: INestApplication;
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmTestConfig()),
        TypeOrmModule.forFeature([
          User,
          Challenge,
          TestCase,
          UserAccount,
          ExternalAuthenticationProvidersRepository,
          Contest,
          Subscription,
        ]),
        AuthModule,
        MailModule,
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        UserAccountsService,
        ExternalAuthenticationProvidersService,
        ChallengesService,
        SubscriptionsService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterEach(async () => await app.close());
});
