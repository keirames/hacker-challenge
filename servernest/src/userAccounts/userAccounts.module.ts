import { Module } from '@nestjs/common';
import { UserAccountsService } from './userAccounts.service';
import { UserAccountsController } from './userAccounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAccount, userAccountSchema } from './schemas/userAccount.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAccount.name, schema: userAccountSchema },
    ]),
  ],
  providers: [UserAccountsService],
  controllers: [UserAccountsController],
  exports: [UserAccountsModule],
})
export class UserAccountsModule {}
