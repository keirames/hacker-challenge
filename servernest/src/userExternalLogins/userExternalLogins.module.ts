import { Module } from '@nestjs/common';
import { UserExternalLoginsController } from './userExternalLogins.controller';
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
  controllers: [UserExternalLoginsController],
  providers: [UserExternalLoginsService, UserExternalLoginsResolver],
  exports: [UserExternalLoginsService],
})
export class UserExternalLoginsModule {}
