import { Module } from '@nestjs/common';
import { ExternalAuthenticationProvidersService } from './externalAuthenticationProviders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalAuthenticationProvidersRepository } from './externalAuthenticationProviders.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExternalAuthenticationProvidersRepository]),
  ],
  providers: [ExternalAuthenticationProvidersService],
  exports: [ExternalAuthenticationProvidersService],
})
export class ExternalAuthenticationProvidersModule {}
