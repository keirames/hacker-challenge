import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { UserAccountsModule } from '../userAccounts/userAccounts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule, UserAccountsModule],
  controllers: [AuthController],
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
