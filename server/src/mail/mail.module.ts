import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { UsersModule } from '../users/users.module';
import { RedisCacheModule } from '../redisCache/redisCache.module';

@Module({
  imports: [UsersModule, RedisCacheModule],
  providers: [MailService],
  exports: [MailService],
  controllers: [MailController],
})
export class MailModule {}
