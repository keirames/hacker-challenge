import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();

    if ((request as Request).headers.authorization) {
      const isRevoked = await this.authService.isTokenRevoked(
        request.headers.authorization,
      );
      if (isRevoked) throw new UnauthorizedException('Token is revoked');
    }

    return super.canActivate(context);
  }
}
