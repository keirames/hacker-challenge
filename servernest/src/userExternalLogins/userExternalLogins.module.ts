import { Module } from '@nestjs/common';
import { UserExternalLoginsController } from './userExternalLogins.controller';
import { UserExternalLoginsService } from './userExternalLogins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserExternalLogin } from './userExternalLogin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserExternalLogin])],
  controllers: [UserExternalLoginsController],
  providers: [UserExternalLoginsService],
  exports: [UserExternalLoginsService],
})
export class UserExternalLoginsModule {}
