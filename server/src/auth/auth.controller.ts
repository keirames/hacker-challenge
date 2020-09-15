import {
  Controller,
  Get,
  Req,
  Post,
  Res,
  NotFoundException,
  Body,
  UseGuards,
  HttpCode,
  Param,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { clientUrl } from '../config/vars';
import { SignUpDto } from './dto/signUpDto.dto';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { MailService } from '../mail/mail.service';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

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

  @Get('/check-reset-password-token/:token')
  async checkResetPasswordToken(
    @Param('token') token: string,
  ): Promise<string> {
    const userId = await this.authService.findResetPasswordTokenValue(token);

    if (userId === null) throw new BadRequestException('Invalid token');

    return 'Valid token';
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
  async signUp(
    @Req() req: Request,
    @Body() accountDetails: SignUpDto,
  ): Promise<string> {
    const host = req.get('host');
    if (!host) throw new NotFoundException('Host cannot be found!');
    const serverUrl = `${req.protocol}://${host}`;

    const user = await this.authService.signUp(accountDetails, serverUrl);
    const { accessToken } = await this.authService.generateToken(user);
    return accessToken;
  }

  @Post('/forgot-password')
  @HttpCode(200)
  async forgotPassword(@Body('email') email: string): Promise<void> {
    return this.authService.forgotPassword(email);
  }

  @Patch('/confirmation/:id')
  async activateAccount(@Param('id') id: string): Promise<string> {
    return this.mailService.confirmEmailActivateAccount(id);
  }

  @Patch('/reset-password')
  async resetPassword(
    @Body('password') newPassword: string,
    @Body('resetPasswordToken') resetPasswordToken: string,
  ): Promise<void> {
    const isValid = await this.mailService.confirmEmailResetPassword(
      newPassword,
      resetPasswordToken,
    );

    if (!isValid) throw new BadRequestException('Invalid token');
  }
}
