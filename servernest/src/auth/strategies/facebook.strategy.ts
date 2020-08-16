import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  StrategyOptionWithRequest,
  Profile,
} from 'passport-facebook';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import {
  facebookClientId,
  facebookClientSecret,
  serverUrl,
} from '../../config/vars';
import { AuthProvider } from '../../externalAuthenticationProviders/externalAuthenticationProvider.entity';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: facebookClientId,
      clientSecret: facebookClientSecret,
      callbackURL: `${serverUrl}/api/auth/facebook/callback`,
      passReqToCallback: true,
      scopeSeparator: 'profile',
    } as StrategyOptionWithRequest);
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<void> {
    const { id, name, email } = profile._json;

    const user = await this.authService.signInWithExternalProvider(
      id,
      AuthProvider.FACEBOOK,
      { email, name },
    );

    /**
     * token : {accessToken : '' }
     */
    const token = await this.authService.generateToken(user);
    return done(null, token);
  }
}
