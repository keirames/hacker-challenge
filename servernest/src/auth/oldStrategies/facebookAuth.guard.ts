import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthProvider } from '../../externalAuthenticationProviders/externalAuthenticationProvider.entity';

@Injectable()
export class FacebookAuthGuard extends AuthGuard(AuthProvider.FACEBOOK) {
  //   async canActivate(context: ExecutionContext): Promise<boolean> {
  //     return true;
  //   }
}
