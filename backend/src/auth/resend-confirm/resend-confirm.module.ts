import { Module } from '@nestjs/common';
import { ResendConfirmService } from './resend-confirm.service';
import { PrismaService } from '../../prisma.service';
import { MailService } from '../../mail/mail.service';

@Module({
  providers: [PrismaService, MailService, ResendConfirmService],
  exports: [ResendConfirmService],
})
export class ResendConfirmModule {}
