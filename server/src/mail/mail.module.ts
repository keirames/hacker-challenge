import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { redisHost, redisPort, redisPassword } from '../config/vars';
import { UsersModule } from '../users/users.module';

export const ConfiguredCacheModule = CacheModule.register({
  store: redisStore,
  ttl: 60 * 10,
  host: redisHost,
  port: redisPort,
  password: redisPassword,
  db: 0,
});

@Module({
  imports: [ConfiguredCacheModule, UsersModule],
  providers: [MailService],
  exports: [MailService, CacheModule],
  controllers: [MailController],
})
export class MailModule {}
