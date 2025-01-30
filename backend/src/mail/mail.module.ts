import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import mailConfig from '../configs/mail.config';

@Module({
  imports: [MailerModule.forRootAsync(mailConfig)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
