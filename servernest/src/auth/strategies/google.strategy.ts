import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  OAuth2Strategy,
  IOAuth2StrategyOptionWithRequest,
  Profile,
} from 'passport-google-oauth';
import { AuthService } from '../auth.service';
import {
  googleClientId,
  googleClientSecret,
  serverUrl,
} from '../../config/vars';
import { AuthProvider } from '../../externalAuthenticationProviders/externalAuthenticationProvider.entity';
import { Request } from 'express';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: `${serverUrl}/api/auth/google/callback`,
      passReqToCallback: true,
      scope: ['profile', 'email'],
    } as IOAuth2StrategyOptionWithRequest);
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<void> {
    const { sub, name, email } = profile._json;

    const user = await this.authService.signInWithExternalProvider(
      sub,
      AuthProvider.GOOGLE,
      { email, name },
    );

    const token = await this.authService.generateToken(user);
    return done(null, token);
  }
}
