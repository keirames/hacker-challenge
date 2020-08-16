import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
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
    ExternalAuthenticationProvidersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GithubStrategy,
    FacebookStrategy,
    GoogleStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
