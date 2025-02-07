import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../prisma.service';
import { AuthService } from '../auth/auth.service';
import { ConfirmChangeEmailModule } from './confirm-change-email/confirm-change-email.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [ConfirmChangeEmailModule, MailModule],
  providers: [PrismaService, UserResolver, UserService, AuthService],
  exports: [UserService],
})
export class UserModule {}
