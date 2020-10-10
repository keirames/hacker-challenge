import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { redisHost, redisPassword, redisPort } from '../config/vars';
import { RedisCacheService } from './redisCache.service';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      ttl: 60 * 10,
      host: redisHost,
      port: redisPort,
      password: redisPassword,
      db: 0,
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
