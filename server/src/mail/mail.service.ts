import { Injectable, Inject, CACHE_MANAGER, CacheStore } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { gmailUser, gmailPass } from '../config/vars';
import { createConfirmEmailLink } from './utils/createConfirmEmailLink';
import { resetPasswordMail, activateAccountMail } from './views/mailBody';
import { UsersService } from '../users/users.service';
import { createResetPasswordLink } from './utils/createResetPasswordLink';

@Injectable()
export class MailService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheStore: CacheStore,

    private readonly usersService: UsersService,
  ) {}

  async sendActivateEmail(
    serverUrl: string,
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

    const confirmEmailLink = await createConfirmEmailLink(
      serverUrl,
      userId,
      this.cacheStore,
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
      this.cacheStore,
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
    const userId = await this.cacheStore.get(confirmationToken);

    if (typeof userId !== 'number' || !userId) {
      return false;
    }

    await this.cacheStore.del(confirmationToken);
    // change status of user to activated
    await this.usersService.activateUser(userId);

    return true;
  }

  async confirmResetPasswordLink(
    newPassword: string,
    resetPasswordToken: string,
  ): Promise<boolean> {
    const userId = await this.cacheStore.get(resetPasswordToken);

    if (typeof userId !== 'number' || !userId) {
      return false;
    }

    await this.cacheStore.del(resetPasswordToken);
    // change password of user
    await this.usersService.changeAccountPassword(userId, newPassword);

    return true;
  }
}
