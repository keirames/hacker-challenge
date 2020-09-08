import { Module } from '@nestjs/common';
import { ExternalAuthenticationProvidersService } from './externalAuthenticationProviders.service';
import { ExternalAuthenticationProvidersController } from './externalAuthenticationProviders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalAuthenticationProvider } from './externalAuthenticationProvider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExternalAuthenticationProvider])],
  providers: [ExternalAuthenticationProvidersService],
  controllers: [ExternalAuthenticationProvidersController],
  exports: [ExternalAuthenticationProvidersService],
})
export class ExternalAuthenticationProvidersModule {}
