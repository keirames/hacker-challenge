import { Module } from '@nestjs/common';
import { ExternalAuthenticationProvidersService } from './externalAuthenticationProviders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalAuthenticationProvider } from './externalAuthenticationProvider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExternalAuthenticationProvider])],
  providers: [ExternalAuthenticationProvidersService],
  exports: [ExternalAuthenticationProvidersService],
})
export class ExternalAuthenticationProvidersModule {}
