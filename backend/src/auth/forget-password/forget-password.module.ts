import { Module } from '@nestjs/common';
import { ForgetPasswordService } from './forget-password.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '../../configs/jwt.config';
import { PrismaService } from '../../prisma.service';
import { MailModule } from '../../mail/mail.module';

@Module({
  imports: [JwtModule.register(jwtConfig), MailModule],
  providers: [PrismaService, ForgetPasswordService],
  exports: [ForgetPasswordService],
})
export class ForgetPasswordModule {}
