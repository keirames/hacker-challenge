import { Module } from '@nestjs/common';
import { ExternalAuthenticationProvidersService } from './externalAuthenticationProviders.service';
import { ExternalAuthenticationProvidersController } from './externalAuthenticationProviders.controller';

@Module({
  providers: [ExternalAuthenticationProvidersService],
  controllers: [ExternalAuthenticationProvidersController],
})
export class ExternalAuthenticationProvidersModule {}
