import { Controller, Get, Param } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('api/mail')
export class MailController {
  constructor(private readonly mailSerice: MailService) {}

  @Get('/confirmation/:id')
  async confirmEmail(@Param('id') id: string): Promise<string> {
    return this.mailSerice.confirmEmail(id);
  }
}
