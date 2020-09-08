import {
  Controller,
  Get,
  Req,
  Post,
  Res,
  NotFoundException,
  Body,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { clientUrl } from '../config/vars';
import { SignUpDto } from './dto/signUpDto.dto';
import { LocalAuthGuard } from './guards/localAuth.guard';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/facebook/signin')
  facebookSignIn(): void {
    // Initiates facebook oauth2 flow
  }

  @Get('/github')
  githubSignIn(): void {
    // Initiates github oauth2 flow
  }

  @Get('/google/signin')
  googleSignIn(): void {
    // Initiates google oauth2 flow
  }

  // Encounter validate fnc is not trigger (in case using guard)
  // cause not declare this @UseGuards for social explicitly
  // Nest will not yelling 'missing @UseGuards'
  @Get('/facebook/callback/signin')
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

  // @Get('/github/callback/signin')
  // async githubSignInCallback(
  //   @Req() req: Request,
  //   @Res() res: Response,
  // ): Promise<void> {
  //   if (req.user) {
  //     res.cookie('Authentication', (<any>req).user.accessToken, {
  //       maxAge: 10000,
  //     });
  //     res.redirect(`${clientUrl}/auth/success`);
  //   }
  //   res.redirect(`${clientUrl}/auth/failure`);
  // }

  @Get('/github/callback')
  async githubMergeCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    if (req.user) {
      if ((<any>req).user.accessToken === '') {
        res.redirect(`${clientUrl}/settings/account`);
      }

      res.cookie('Authentication', (<any>req).user.accessToken, {
        maxAge: 10000,
      });
      res.redirect(`${clientUrl}/auth/success`);
    }
    res.redirect(`${clientUrl}/auth/failure`);
  }

  @Get('/google/callback/signin')
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

  // Note if @Body('accountDetails') client must provide
  // {accoutDetails: account} in axios
  @Post('/signup')
  async signUp(@Body() accountDetails: SignUpDto): Promise<string> {
    const user = await this.authService.signUp(accountDetails);
    const { accessToken } = await this.authService.generateToken(user);
    return accessToken;
  }

  @Get('/test')
  async test(): Promise<void> {
    await this.authService.test();
  }
}
