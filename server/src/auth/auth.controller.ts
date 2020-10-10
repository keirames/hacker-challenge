import {
  Controller,
  Get,
  Req,
  Post,
  Res,
  Body,
  HttpCode,
  Param,
  Patch,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { clientUrl } from '../config/vars';
import { SignUpDto } from './dto/signUpDto.dto';
import { MailService } from '../mail/mail.service';
import { SignInDto } from './dto/signInDto.dto';
import { JwtAuthGuard } from './guards/jwtAuth.guard';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  private createRedirectLink(type: 'signin' | 'merge'): string {
    return `${clientUrl}/auth/social-check/${type}`;
  }

  @Get('/facebook')
  facebookSignIn(): void {
    // Initiates facebook oauth2 flow
  }

  @Get('/github')
  githubSignIn(): void {
    // Initiates github oauth2 flow
  }

  @Get('/google')
  googleSignIn(): void {
    // Initiates google oauth2 flow
  }

  // Encounter validate fnc is not trigger (in case using guard)
  // cause not declare this @UseGuards for social explicitly
  // Nest will not yelling 'missing @UseGuards'
  @Get('/facebook/callback')
  async facebookSignInCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    if (req.user) {
      if ((req as any).user.accessToken.length === 0) {
        res.redirect(this.createRedirectLink('merge'));
        return;
      }

      res.cookie('Authentication', (req as any).user.accessToken, {
        maxAge: 10000,
      });
      res.redirect(this.createRedirectLink('signin'));
      return;
    }
    res.redirect(this.createRedirectLink('signin'));
  }

  @Get('/github/callback')
  async githubMergeCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    if (req.user) {
      if ((req as any).user.accessToken.length === 0) {
        res.redirect(this.createRedirectLink('merge'));
        return;
      }

      res.cookie('Authentication', (req as any).user.accessToken, {
        maxAge: 10000,
      });
      res.redirect(this.createRedirectLink('signin'));
      return;
    }
    res.redirect(this.createRedirectLink('signin'));
  }

  @Get('/google/callback')
  async googleSignInCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    if (req.user) {
      if ((req as any).user.accessToken.length === 0) {
        res.redirect(this.createRedirectLink('merge'));
        return;
      }

      res.cookie('Authentication', (req as any).user.accessToken, {
        maxAge: 10000,
      });
      res.redirect(this.createRedirectLink('signin'));
      return;
    }
    res.redirect(this.createRedirectLink('signin'));
  }

  @Get('/check-reset-password-token/:token')
  async checkResetPasswordToken(
    @Param('token') token: string,
  ): Promise<string> {
    const userId = await this.authService.findResetPasswordTokenValue(token);

    if (userId === null) throw new BadRequestException('Invalid token');

    return 'Valid token';
  }

  @Post('/signin')
  async signIn(@Body() account: SignInDto): Promise<string> {
    const user = await this.authService.signIn(account);

    const { accessToken } = await this.authService.generateToken(user);

    return accessToken;
  }

  // Note if @Body('accountDetails') client must provide
  // {accoutDetails: account} in axios
  @Post('/signup')
  @HttpCode(200)
  async signUp(@Body() accountDetails: SignUpDto): Promise<string> {
    // const host = req.get('host');
    // if (!host) throw new NotFoundException('Host cannot be found!');
    // const serverUrl = `${req.protocol}://${host}`;

    await this.authService.signUp(accountDetails);

    return 'Sign up successfully.';
  }

  @Post('/forgot-password')
  @HttpCode(200)
  async forgotPassword(@Body('email') email: string): Promise<void> {
    return this.authService.forgotPassword(email);
  }

  @Patch('/confirmation')
  async activateAccount(
    @Body('confirmationToken') confirmationToken: string,
  ): Promise<void> {
    const isValid = await this.mailService.confirmActivateAccountLink(
      confirmationToken,
    );

    if (!isValid) throw new BadRequestException('Invalid token');
  }

  @Patch('/reset-password')
  async resetPassword(
    @Body('password') newPassword: string,
    @Body('resetPasswordToken') resetPasswordToken: string,
  ): Promise<void> {
    const isValid = await this.mailService.confirmResetPasswordLink(
      newPassword,
      resetPasswordToken,
    );

    if (!isValid) throw new BadRequestException('Invalid token');
  }

  @UseGuards(JwtAuthGuard)
  @Post('/signout')
  async signOut(@Body('token') bearerToken: string): Promise<void> {
    await this.authService.signOut(bearerToken);
  }
}
