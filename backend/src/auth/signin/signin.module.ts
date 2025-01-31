import { Module } from '@nestjs/common';
import { SigninService } from './signin.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '../../configs/jwt.config';
import { MailModule } from '../../mail/mail.module';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [JwtModule.register(jwtConfig), MailModule],
  providers: [PrismaService, SigninService],
  exports: [SigninService],
})
export class SigninModule {}
