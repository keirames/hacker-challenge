import { Module } from '@nestjs/common';
import { UserExternalLoginsController } from './userExternalLogins.controller';
import { UserExternalLoginsService } from './userExternalLogins.service';

@Module({
  controllers: [UserExternalLoginsController],
  providers: [UserExternalLoginsService],
})
export class UserExternalLoginsModule {}
