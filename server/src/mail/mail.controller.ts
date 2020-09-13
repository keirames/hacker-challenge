import { Body, Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { MailService } from './mail.service';

@Controller('api/mail')
export class MailController {
  constructor(private readonly mailSerice: MailService) {}

  @Get('/confirmation/:id')
  async activateAccount(@Param('id') id: string): Promise<string> {
    return this.mailSerice.confirmEmailActivateAccount(id);
  }

  @Get('/recover-password/:id')
  async forgotPassword(
    @Res() res: Response,
    @Param('id') id: string,
    @Body('password') newPassword: string,
  ): Promise<void> {
    const isValid = await this.mailSerice.confirmEmailForgotPassword(
      id,
      newPassword,
    );
    if (isValid) res.send('https://google.com');
    else res.send('https://youtube.com');
  }
}
