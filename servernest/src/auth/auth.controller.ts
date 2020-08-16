import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Res,
  NotFoundException,
  Body,
} from '@nestjs/common';
import { GithubAuthGuard } from './guards/githubAuth.guard';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { AuthService } from './auth.service';
import { FacebookAuthGuard } from './guards/facebookAuth.guard';
import { clientUrl } from '../config/vars';
import { GoogleAuthGuard } from './guards/googleAuth.guard';
import { SignUpDto } from './dto/signUpDto.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(FacebookAuthGuard)
  @Get('/facebook')
  facebookSignIn(): void {
    // Initiates facebook oauth2 flow
  }

  @UseGuards(GithubAuthGuard)
  @Get('/github')
  githubSignIn(): void {
    // Initiates github oauth2 flow
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google')
  googleSignIn(): void {
    // Initiates google oauth2 flow
  }

  // Encounter validate fnc is not trigger
  // cause not declare this @UseGuards for social explicitly
  // Nest will not yelling 'missing @UseGuards'
  @UseGuards(FacebookAuthGuard)
  @Get('/facebook/callback')
  async facebookSignInCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    if (req.user) {
      res.cookie('Authentication', (<any>req).user.accessToken, {
        maxAge: 10000,
      });
      res.redirect(`${clientUrl}/auth/success`);
    }
    res.redirect(`${clientUrl}/auth/failure`);
  }

  @UseGuards(GithubAuthGuard)
  @Get('/github/callback')
  async githubSignInCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    if (req.user) {
      res.cookie('Authentication', (<any>req).user.accessToken, {
        maxAge: 10000,
      });
      res.redirect(`${clientUrl}/auth/success`);
    }
    res.redirect(`${clientUrl}/auth/failure`);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google/callback')
  async googleSignInCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    if (req.user) {
      res.cookie('Authentication', (<any>req).user.accessToken, {
        maxAge: 10000,
      });
      res.redirect(`${clientUrl}/auth/success`);
    }
    res.redirect(`${clientUrl}/auth/failure`);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(@Req() req: Request): Promise<string> {
    if (!req.user)
      throw new NotFoundException('Local token is not passing properly');
    return (req.user as any).accessToken;
  }

  @Post('/signup')
  async signUp(@Body() accountDetails: SignUpDto): Promise<string> {
    const user = await this.authService.signUp(accountDetails);
    const { accessToken } = await this.authService.generateToken(user);
    return accessToken;
  }
}
