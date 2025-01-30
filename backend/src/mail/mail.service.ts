import { Injectable } from '@nestjs/common';
import { UserModel } from '../models/user/user.model';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendConfirmation(user: Partial<UserModel>, token: string) {
    const url: string = `${this.configService.get('SERVER_URL')}/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Finance Tracker! Confirm your Email',
      template: './confirmation.hbs',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
