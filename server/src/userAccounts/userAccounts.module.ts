import { Module } from '@nestjs/common';
import { UserAccountsService } from './userAccounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccount } from './userAccount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAccount])],
  controllers: [],
  providers: [UserAccountsService],
  exports: [UserAccountsService],
})
export class UserAccountsModule {}
