import { Injectable, Inject, CACHE_MANAGER, CacheStore } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { gmailUser, gmailPass } from '../config/vars';
import { createConfirmEmailLink } from './utils/createConfirmEmailLink';
import { mailBody } from './views/mailBody';
import { UsersService } from '../users/users.service';

@Injectable()
export class MailService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheStore: CacheStore,

    private readonly usersService: UsersService,
  ) {}

  async sendEmail(
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
      from: '"Hacker_Bot 😎🤘🏻" 7paykun@gmail.com',
      to: email, // list of receivers
      subject: 'Confirmation email ✔',
      attachments: [
        {
          path: 'public/images/mail-logo.png',
          cid: 'mail-logo',
        },
      ],
      html: mailBody(confirmEmailLink, name),
    });
  }

  async confirmEmail(id: string): Promise<string> {
    const userId = await this.cacheStore.get(id);

    if (typeof userId !== 'number' || !userId) {
      return 'Invalid link or it is expired';
    }

    await this.cacheStore.del(id);
    // change status of user to activated
    await this.usersService.activateUser(userId);

    return 'OK';
  }
}
