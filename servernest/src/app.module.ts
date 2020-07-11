import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { UserAccountsModule } from './userAccounts/userAccounts.module';
import { ExternalAuthenticationProvidersModule } from './externalAuthenticationProviders/externalAuthenticationProviders.module';
import { PlansModule } from './plans/plans.module';
import { ContestsModule } from './contests/contests.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { ChallengesModule } from './challenges/challenges.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/hacker-challenge', {
      useCreateIndex: true,
    }),
    UsersModule,
    UserAccountsModule,
    ExternalAuthenticationProvidersModule,
    PlansModule,
    ContestsModule,
    SubmissionsModule,
    ChallengesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
