import { Module } from '@nestjs/common';
import { UserAccountsController } from './userAccounts.controller';
import { UserAccountsService } from './userAccounts.service';

@Module({
  controllers: [UserAccountsController],
  providers: [UserAccountsService],
})
export class UserAccountsModule {}
