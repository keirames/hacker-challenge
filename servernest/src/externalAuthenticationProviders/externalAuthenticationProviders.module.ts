import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { externalAuthenticationProviderSchema } from './schemas/externalAuthenticationProvider.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ExternalAuthenticationProvidersModule.name,
        schema: externalAuthenticationProviderSchema,
      },
    ]),
  ],
})
export class ExternalAuthenticationProvidersModule {}
