import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ExternalAuthenticationProvider } from '../../externalAuthenticationProviders/externalAuthenticationProvider.entity';
import { ExternalAuthenticationProviderDto } from '../../externalAuthenticationProviders/dto/externalAuthenticationProvider.dto';

@ObjectType()
export class UserExternalLoginDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  externalUserId: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;

  @Field(() => ExternalAuthenticationProviderDto)
  externalAuthenticationProvider: ExternalAuthenticationProvider;
}
