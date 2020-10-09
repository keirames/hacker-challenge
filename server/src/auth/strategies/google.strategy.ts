import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  OAuth2Strategy,
  IOAuth2StrategyOptionWithRequest,
  Profile,
} from 'passport-google-oauth';
import { use } from 'passport';
import { AuthService } from '../auth.service';
import {
  googleClientId,
  googleClientSecret,
  serverUrl,
} from '../../config/vars';
import { AuthProvider } from '../../externalAuthenticationProviders/externalAuthenticationProvider.entity';
import { Request } from 'express';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super(
      {
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: `${serverUrl}/api/auth/google/callback`,
        passReqToCallback: true,
        scope: ['profile', 'email'],
      } as IOAuth2StrategyOptionWithRequest,
      async (
        req: Request,
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (error: any, user?: any, info?: any) => void,
      ): Promise<void> => {
        const { sub, name, email } = profile._json;

        const state: [string | null, string | null] = JSON.parse(
          req.query.state as any,
        );
        const [type, userId] = state;

        const user = await this.authService.signInWithExternalProvider(
          sub,
          AuthProvider.GOOGLE,
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
// export class GoogleStrategy extends PassportStrategy(OAuth2Strategy, 'google') {
//   constructor(private readonly authService: AuthService) {
//     super({
//       clientID: googleClientId,
//       clientSecret: googleClientSecret,
//       callbackURL: `${serverUrl}/api/auth/google/callback`,
//       passReqToCallback: true,
//       scope: ['profile', 'email'],
//     } as IOAuth2StrategyOptionWithRequest);
//   }

//   async validate(
//     req: Request,
//     accessToken: string,
//     refreshToken: string,
//     profile: Profile,
//     done: (error: any, user?: any, info?: any) => void,
//   ): Promise<void> {
//     const { sub, name, email } = profile._json;

//     const state: [string | null, string | null] = JSON.parse(
//       req.query.state as any,
//     );
//     const [type, userId] = state;

//     const user = await this.authService.signInWithExternalProvider(
//       sub,
//       AuthProvider.GOOGLE,
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
