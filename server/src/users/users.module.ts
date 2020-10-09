import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersResolver } from './users.resolver';
import { UserAccountsModule } from '../userAccounts/userAccounts.module';
import { UserExternalLoginsModule } from '../userExternalLogins/userExternalLogins.module';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { ChallengesModule } from '../challenges/challenges.module';
import { UserAccount } from '../userAccounts/userAccount.entity';
import { CodeEvaluatorModule } from '../codeEvaluator/codeEvaluator.module';
import { SolvedChallengesModule } from '../solvedChallenges/solvedChallenges.module';
import { Submission } from '../submissions/submission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserAccount, Submission]),
    ChallengesModule,
    UserAccountsModule,
    UserExternalLoginsModule,
    SubscriptionsModule,
    SolvedChallengesModule,
    CodeEvaluatorModule,
  ],
  controllers: [],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
