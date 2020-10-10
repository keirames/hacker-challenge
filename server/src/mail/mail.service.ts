import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { gmailUser, gmailPass } from '../config/vars';
import { createConfirmationLink } from './utils/createConfirmationLink';
import { resetPasswordMail, activateAccountMail } from './views/mailBody';
import { UsersService } from '../users/users.service';
import { createResetPasswordLink } from './utils/createResetPasswordLink';
import { RedisCacheService } from '../redisCache/redisCache.service';

@Injectable()
export class MailService {
  constructor(
    private readonly usersService: UsersService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  async sendActivateEmail(
    clientUrl: string,
    user: { userId: number; email: string; name: string },
  ): Promise<void> {
    const { userId, email, name } = user;

    const transporter = createTransport({
      service: 'Gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const confirmEmailLink = await createConfirmationLink(
      clientUrl,
      userId,
      this.redisCacheService.getCacheManager(),
    );

    // send mail with defined transport object
    // without sync and dont care success or not
    transporter.sendMail({
      from: '"Hacker Bot 😎🤘🏻" 7paykun@gmail.com',
      to: email, // list of receivers
      subject: 'Confirmation email ✔',
      attachments: [
        {
          path: 'public/images/mail-logo.png',
          cid: 'mail-logo',
        },
      ],
      html: activateAccountMail(confirmEmailLink, name),
    });
  }

  async sendResetPasswordEmail(
    clientUrl: string,
    user: { userId: number; email: string; name: string },
  ): Promise<void> {
    const { userId, email, name } = user;

    const transporter = createTransport({
      service: 'Gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const resetPasswordLink = await createResetPasswordLink(
      clientUrl,
      userId,
      this.redisCacheService.getCacheManager(),
    );

    // send mail with defined transport object
    // without sync and dont care success or not
    transporter.sendMail({
      from: '"Hacker Bot 😎🤘🏻" 7paykun@gmail.com',
      to: email, // list of receivers
      subject: 'Reset password email ✔',
      attachments: [
        {
          path: 'public/images/mail-logo.png',
          cid: 'mail-logo',
        },
      ],
      html: resetPasswordMail(resetPasswordLink, name),
    });
  }

  async confirmActivateAccountLink(
    confirmationToken: string,
  ): Promise<boolean> {
    const userId = await this.redisCacheService
      .getCacheManager()
      .get(confirmationToken);

    if (typeof userId !== 'number' || !userId) {
      return false;
    }

    await this.redisCacheService.getCacheManager().del(confirmationToken);
    // change status of user to activated
    await this.usersService.activateUser(userId);

    return true;
  }

  async confirmResetPasswordLink(
    newPassword: string,
    resetPasswordToken: string,
  ): Promise<boolean> {
    const userId = await this.redisCacheService
      .getCacheManager()
      .get(resetPasswordToken);

    if (typeof userId !== 'number' || !userId) {
      return false;
    }

    await this.redisCacheService.getCacheManager().del(resetPasswordToken);
    // change password of user
    await this.usersService.changeAccountPassword(userId, newPassword);

    return true;
  }
}
