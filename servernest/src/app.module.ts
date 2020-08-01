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
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      include: [
        ChallengesModule,
        ContestsModule,
        TestCasesModule,
        UsersModule,
        UserAccountsModule,
      ],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ExternalAuthenticationProvidersModule,
    UserExternalLoginsModule,
    UsersModule,
    UserAccountsModule,
    PlansModule,
    ChallengesModule,
    ContestsModule,
    SubmissionsModule,
    TestCasesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
