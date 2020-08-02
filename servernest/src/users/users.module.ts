import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersResolver } from './users.resolver';
import { UserAccountsModule } from '../userAccounts/userAccounts.module';
import { UserExternalLoginsModule } from '../userExternalLogins/userExternalLogins.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserAccountsModule,
    UserExternalLoginsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
