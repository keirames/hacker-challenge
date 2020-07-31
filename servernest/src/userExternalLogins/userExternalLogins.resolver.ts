import { UserExternalLoginsService } from './userExternalLogins.service';
import { Resolver, Parent, ResolveField } from '@nestjs/graphql';
import { UserExternalLoginDto } from './dto/userExternalLogin.dto';
import { ExternalAuthenticationProviderDto } from '../externalAuthenticationProviders/dto/externalAuthenticationProvider.dto';
import { ExternalAuthenticationProvidersService } from '../externalAuthenticationProviders/externalAuthenticationProviders.service';
import { ExternalAuthenticationProvider } from '../externalAuthenticationProviders/externalAuthenticationProvider.entity';
import { UserExternalLogin } from './userExternalLogin.entity';

@Resolver(() => UserExternalLoginDto)
export class UserExternalLoginsResolver {
  constructor(
    private readonly externalAuthenticationProvidersService: ExternalAuthenticationProvidersService,
  ) {}

  @ResolveField(
    'externalAuthenticationProvider',
    () => ExternalAuthenticationProviderDto,
  )
  getExternalAuthenticationProvider(
    @Parent() userExternalLogin: UserExternalLogin,
  ): Promise<ExternalAuthenticationProvider> {
    return this.externalAuthenticationProvidersService.findById(
      userExternalLogin.externalAuthenticationProviderId,
    );
  }
}
