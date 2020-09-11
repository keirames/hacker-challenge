import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { ExternalAuthenticationProvidersModule } from './externalAuthenticationProviders/externalAuthenticationProviders.module';
import { UserExternalLoginsModule } from './userExternalLogins/userExternalLogins.module';
import { UsersModule } from './users/users.module';
import { UserAccountsModule } from './userAccounts/userAccounts.module';
import { PlansModule } from './plans/plans.module';
import { ChallengesModule } from './challenges/challenges.module';
import { ContestsModule } from './contests/contests.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { TestCasesModule } from './testCases/testCases.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { TestInputsService } from './testInputs/testInputs.service';
import { TestInputsModule } from './testInputs/testInputs.module';
import { levelResolver } from './challenges/dto/challenge.dto';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      resolvers: { Level: levelResolver },
      include: [
        ChallengesModule,
        ContestsModule,
        TestCasesModule,
        TestInputsModule,
        UsersModule,
        UserAccountsModule,
        UserExternalLoginsModule,
        ExternalAuthenticationProvidersModule,
        SubscriptionsModule,
        PlansModule,
        SubmissionsModule,
      ],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ScheduleModule.forRoot(),
    ExternalAuthenticationProvidersModule,
    UserExternalLoginsModule,
    UsersModule,
    UserAccountsModule,
    PlansModule,
    ChallengesModule,
    ContestsModule,
    SubmissionsModule,
    TestCasesModule,
    TestInputsModule,
    AuthModule,
    MailModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService, TestInputsService],
})
export class AppModule {}
