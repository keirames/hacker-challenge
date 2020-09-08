import { Module } from '@nestjs/common';
import { UserAccountsController } from './userAccounts.controller';
import { UserAccountsService } from './userAccounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccount } from './userAccount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAccount])],
  controllers: [UserAccountsController],
  providers: [UserAccountsService],
  exports: [UserAccountsService],
})
export class UserAccountsModule {}
