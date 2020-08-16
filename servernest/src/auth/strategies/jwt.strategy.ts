import { Injectable, NotFoundException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../../users/users.service';
import { jwtPrivateKey } from '../../config/vars';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtPrivateKey,
    });
  }

  async validate(payload: { sub: number }): Promise<{ userId: number }> {
    const user = await this.usersService.findById(payload.sub);
    // If user account is revoked
    // you can add check here
    if (!user) throw new NotFoundException('User is deleted or revoked.');

    return { userId: payload.sub };
  }
}
