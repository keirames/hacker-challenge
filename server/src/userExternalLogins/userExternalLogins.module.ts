import { Module } from '@nestjs/common';
import { UserExternalLoginsService } from './userExternalLogins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserExternalLogin } from './userExternalLogin.entity';
import { UserExternalLoginsResolver } from './userExternalLogins.resolver';
import { ExternalAuthenticationProvidersModule } from '../externalAuthenticationProviders/externalAuthenticationProviders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserExternalLogin]),
    ExternalAuthenticationProvidersModule,
  ],
  controllers: [],
  providers: [UserExternalLoginsService, UserExternalLoginsResolver],
  exports: [UserExternalLoginsService],
})
export class UserExternalLoginsModule {}
