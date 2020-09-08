import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthProvider } from '../../externalAuthenticationProviders/externalAuthenticationProvider.entity';

@Injectable()
export class GoogleAuthGuard extends AuthGuard(AuthProvider.GOOGLE) {}
