import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthProvider } from '../../externalAuthenticationProviders/externalAuthenticationProvider.entity';

@Injectable()
export class GithubAuthGuard extends AuthGuard(AuthProvider.GITHUB) {}
