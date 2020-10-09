import { Injectable, BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptionsWithRequest } from 'passport-github2';
import { use } from 'passport';
import {
  githubClientId,
  githubClientSecret,
  serverUrl,
} from '../../config/vars';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { AuthProvider } from '../../externalAuthenticationProviders/externalAuthenticationProvider.entity';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly authService: AuthService) {
    super(
      {
        clientID: githubClientId,
        clientSecret: githubClientSecret,
        callbackURL: `${serverUrl}/api/auth/github/callback`,
        passReqToCallback: true,
      } as StrategyOptionsWithRequest,
      async (
        req: Request,
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: (err?: Error | null, profile?: any) => void,
      ): Promise<void> => {
        const { id, name, email } = profile._json;

        const state: [string | null, string | null] = JSON.parse(
          req.query.state as any,
        );
        const [type, userId] = state;

        const user = await this.authService.signInWithExternalProvider(
          id,
          AuthProvider.GITHUB,
          { email, name },
        );

        if (type === 'merge') {
          if (userId === null)
            throw new BadRequestException(`Missing current user'id`);

          await this.authService.mergeExternalProvider(
            parseInt(userId),
            user.id,
          );
          return done(null, { accessToken: '' });
        } else {
          const token = await this.authService.generateToken(user);
          return done(null, token);
        }
      },
    );

    use(this);
  }
}

// @Injectable()
// export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
//   constructor(private readonly authService: AuthService) {
//     super({
//       clientID: githubClientId,
//       clientSecret: githubClientSecret,
//       callbackURL: `${serverUrl}/api/auth/github/callback`,
//       passReqToCallback: true,
//     } as StrategyOptionsWithRequest);
//   }

//   // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
//   async validate(
//     req: Request,
//     accessToken: string,
//     refreshToken: string,
//     profile: any,
//     done: (err?: Error | null, profile?: any) => void,
//   ): Promise<void> {
//     const { id, name, email } = profile._json;

//     const state: [string | null, string | null] = JSON.parse(
//       req.query.state as any,
//     );
//     const [type, userId] = state;

//     const user = await this.authService.signInWithExternalProvider(
//       id,
//       AuthProvider.GITHUB,
//       { email, name },
//     );

//     if (type === 'merge') {
//       if (userId === null)
//         throw new BadRequestException(`Missing current user'id`);

//       await this.authService.mergeExternalProvider(parseInt(userId), user.id);
//       return done(null, { accessToken: '' });
//     } else {
//       const token = await this.authService.generateToken(user);
//       return done(null, token);
//     }
//   }
// }
