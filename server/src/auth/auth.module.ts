import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { UserAccountsModule } from '../userAccounts/userAccounts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { GithubStrategy } from './strategies/github.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { ExternalAuthenticationProvidersModule } from '../externalAuthenticationProviders/externalAuthenticationProviders.module';
import { jwtExpirationInterval, jwtPrivateKey } from '../config/vars';
import { authenticate, AuthenticateOptions } from 'passport';
import { Request, Response } from 'express';
import { UserExternalLoginsModule } from '../userExternalLogins/userExternalLogins.module';
import { Challenge } from '../challenges/challenge.entity';
import { TestCase } from '../testCases/testCase.entity';
import { MailService } from '../mail/mail.service';
import { ConfiguredCacheModule } from '../mail/mail.module';

@Module({
  imports: [
    ConfiguredCacheModule,
    TypeOrmModule.forFeature([User, Challenge, TestCase]),
    // PassportModule.register({
    //   defaultStrategy: 'jwt',
    //   property: 'user',
    //   session: false,
    // }),
    JwtModule.register({
      secret: jwtPrivateKey,
      signOptions: { expiresIn: jwtExpirationInterval },
    }),
    UsersModule,
    UserAccountsModule,
    UserExternalLoginsModule,
    ExternalAuthenticationProvidersModule,
  ],
  controllers: [AuthController],
  providers: [
    MailService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GithubStrategy,
    FacebookStrategy,
    GoogleStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    const loginOptions: AuthenticateOptions = {
      scope: ['user:email'],
      state: undefined,
      session: false,
    };

    consumer
      .apply((req: Request, res: Response, next: () => void) => {
        loginOptions.state = JSON.stringify([req.query.type, req.query.userId]);
        next();
      }, authenticate('github', loginOptions))
      .forRoutes(
        { path: 'api/auth/github', method: RequestMethod.GET },
        { path: 'api/auth/github/callback', method: RequestMethod.GET },
      );
  }
}
