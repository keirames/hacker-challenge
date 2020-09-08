import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptionsWithRequest } from 'passport-github2';
import { AuthService } from '../auth.service';
import {
  githubClientId,
  githubClientSecret,
  serverUrl,
} from '../../config/vars';
import { AuthProvider } from '../../externalAuthenticationProviders/externalAuthenticationProvider.entity';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: githubClientId,
      clientSecret: githubClientSecret,
      callbackURL: `${serverUrl}/api/auth/github/callback/signin`,
    } as StrategyOptionsWithRequest);
  }

  // This lib dont have Profile type explicitly (missing _json)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err?: Error | null, profile?: any) => void,
  ): Promise<any> {
    const { id, name, email } = profile._json;

    const user = await this.authService.signInWithExternalProvider(
      id,
      AuthProvider.GITHUB,
      { email, name },
    );

    const token = await this.authService.generateToken(user);
    return done(null, token);
  }
}
